import React from 'react';
import Navbar from './Navbar';
import InputTag from './InputTag';
import { withRouter } from 'react-router-dom'

var firebase = window.firebase;

class Profile extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            tags: [],
            photoUrl: 'https://lh5.googleusercontent.com/-rtYhFj95h7M/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnGJeXJM8mYTwdjtFvQfSI75FTp5w/c/photo.jpg?height=180&amp;width=180'
        }
        this.fileInput = React.createRef();
    }

    componentDidMount(){
        var _self = this;
        if(!firebase.auth().currentUser){
            _self.props.history.push("/");
            return;
        }
        var database = firebase.database();
        var userId = firebase.auth().currentUser.uid;
        database.ref('/users/' + userId).once('value').then(function(snapshot) {
            var name = (snapshot.val() && snapshot.val().username) || '';
            var address = (snapshot.val() && snapshot.val().address) || '';
            var tags = (snapshot.val() && snapshot.val().tags) || [];
            var photoUrl = (snapshot.val() && snapshot.val().photoUrl) || [];
            _self.setState({
                name: name,
                address: address,
                tags: tags,
                photoUrl: photoUrl
            });
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });
    }
    handleTagsChange(values) {
        this.setState({  tags: values });
    }
    updateProfile(){
        var _self = this;
        var userId = firebase.auth().currentUser.uid;

        var photoUrl;
        if(this.fileInput.current.files && this.fileInput.current.files.length){
            photoUrl = 'https://firebasestorage.googleapis.com/v0/b/indiefilmstarter.appspot.com/o/users%2F'+userId+'%2Fprofile.jpg?alt=media';
            var storageRef = firebase.storage().ref();
            var profileRef = storageRef.child('users/'+ userId + '/profile.jpg');
            profileRef.put(this.fileInput.current.files[0]).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
                _self.setState({photoUrl: photoUrl});
            });
        }

        var database = firebase.database();
        database.ref('/users/' + userId).set({
            username: _self.state.name,
            address: _self.state.address, 
            tags: _self.state.tags,
            photoUrl: photoUrl ? photoUrl : _self.state.photoUrl
          });
    }
    render() {
        return(
            <div>
                <Navbar />
                <br />
                <div>
                    <h2>Update your Profile!</h2>
                    <div className="col-md-8 offset-md-1">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <div id="user-photo" className="clearfix">
                                        <label>Photo</label>

                                        <figure id="current-avatar">
                                            <img alt="image" className="user-photo facebook_avatar_image image-replacement" src={this.state.photoUrl} style={{maxWidth: "100px"}} />
                                        </figure>
                                        <div id="user_photo_block">
                                            <label htmlFor="user_photo_file" id="change_photo_label">
                                                <span tabIndex="0">Upload Photo</span>
                                                <div className="input file optional user_photo_data">
                                                    <input ref={this.fileInput} id="user_photo_file" className="file optional hide" type="file" name="user_photo[data]" />
                                                    </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Name</label>
                                    <input name="name" value={this.state.name} type="text" className="form-control" id="inputEmail4" onChange={this.handleInputChange.bind(this)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Skills</label>
                                    <InputTag value={this.state.tags} onChange={this.handleTagsChange.bind(this)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input name="address" value={this.state.address} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" onChange={this.handleInputChange.bind(this)} />
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.updateProfile.bind(this)}>Update</button>
                        </form>
                    </div>
                </div>
            
            </div>
        )
  }
}
  
  export default withRouter(Profile);