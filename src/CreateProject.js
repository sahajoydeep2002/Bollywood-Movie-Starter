import React from 'react';
import Navbar from './Navbar';
import InputTag from './InputTag';
import NewPosition from './NewPosition';
import { withRouter } from 'react-router-dom'

var firebase = window.firebase;

class CreateProject extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            tags: [],
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/indiefilmstarter.appspot.com/o/header-bg-2.jpg?alt=media',
            positions: [{title: '', description: '', status: 'open'}]
        }
        this.fileInput = React.createRef();
        this.onPositionChangeBind = this.onPositionChange.bind(this);
        this.onPositionRemoveBind = this.onPositionRemove.bind(this);
    }

    componentDidMount(){
        var _self = this;
        if(!firebase.auth().currentUser){
            _self.props.history.push("/");
            return;
        }
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

        var database = firebase.database();
        var newRef = database.ref('projects').push();
        var photoUrl;
        if(this.fileInput.current.files && this.fileInput.current.files.length){
            photoUrl = 'https://firebasestorage.googleapis.com/v0/b/indiefilmstarter.appspot.com/o/projects%2F'+newRef.key+'%2Fimage.jpg?alt=media';
            var storageRef = firebase.storage().ref();
            var profileRef = storageRef.child('projects/'+ newRef.key + '/image.jpg');
            profileRef.put(this.fileInput.current.files[0]).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
                newRef.set({
                    name: _self.state.name,
                    description: _self.state.description, 
                    tags: _self.state.tags,
                    photoUrl: photoUrl ? photoUrl : _self.state.photoUrl,
                    owner: userId,
                    positions: _self.state.positions
                });
                database.ref('/users/' + userId + '/projects/' + newRef.key).set({
                    name: _self.state.name,
                    description: _self.state.description, 
                    tags: _self.state.tags,
                    photoUrl: photoUrl ? photoUrl : _self.state.photoUrl
                  });
                  _self.props.history.push("/portfolio");
            });
        }else{
            newRef.set({
                name: _self.state.name,
                description: _self.state.description, 
                tags: _self.state.tags,
                photoUrl: photoUrl ? photoUrl : _self.state.photoUrl,
                owner: userId,
                positions: _self.state.positions
            });
            database.ref('/users/' + userId + '/projects/' + newRef.key).set({
                name: _self.state.name,
                description: _self.state.description, 
                tags: _self.state.tags,
                photoUrl: photoUrl ? photoUrl : _self.state.photoUrl
              });
              _self.props.history.push("/portfolio");
        }
    }
    addPosition(){
        this.setState({positions: [...this.state.positions, {title: '', description: '', status: 'open'}]});
    }
    onPositionRemove(index){
        const positions = [ ...this.state.positions ];
        positions.splice(index, 1);
        this.setState({positions: positions});
    }
    onPositionChange(event, index){
        const positions = [...this.state.positions];
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        positions[index][name] = value;
        this.setState({
            positions: positions    
        });
    }
    render() {
        var _self = this;
        var positions = [];
        for (let i = 0; i < this.state.positions.length; i++) {
            const position = this.state.positions[i];
            positions.push(<NewPosition title={position.title} description={position.description} onChange={(e) => _self.onPositionChangeBind(e, i)} onRemove={() => _self.onPositionRemoveBind(i)} />);
        }
        return(
            <div>
                <Navbar />
                <br />
                <div>
                    <h2>Create a new Film Project!</h2>
                    <div className="col-md-8 offset-md-1">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Name</label>
                                    <input name="name" value={this.state.name} type="text" className="form-control" id="inputEmail4" onChange={this.handleInputChange.bind(this)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputDescription">Description</label>
                                    <textarea name="description" value={this.state.description} className="form-control" id="inputDescription" rows="3" onChange={this.handleInputChange.bind(this)}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <div id="user-photo" className="clearfix">
                                        <label>Project Image</label>

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
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Tags</label>
                                    <InputTag value={this.state.tags} onChange={this.handleTagsChange.bind(this)} />
                                </div>
                            </div>
                            <h3>Positions</h3>
                            {positions}
                            <button type="button" className="btn btn-primary" onClick={this.addPosition.bind(this)}>Add Position</button>
                            
                            <button type="button" className="btn btn-primary" onClick={this.updateProfile.bind(this)}>Create</button>
                        </form>
                    </div>
                </div>
            
            </div>
        )
  }
}
  
  export default withRouter(CreateProject);