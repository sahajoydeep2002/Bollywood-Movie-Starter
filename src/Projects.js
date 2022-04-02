import React from 'react';
import Navbar from './Navbar';
import Card from './Card';
import { withRouter } from 'react-router-dom';

var firebase = window.firebase;

class Project extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
        projects: [],
        query: ''
    }
  }
  componentDidMount(){
    var _self = this;
    if(!firebase.auth().currentUser){
        _self.props.history.push("/");
        return;
    }
    var database = firebase.database();
    var userId = firebase.auth().currentUser.uid;
    var projects = [];
    database.ref('projects').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.child('owner').val() !== userId){
            var positions = childSnapshot.child('positions').val();
            var openPositions = 0;
            if(positions && positions.length)
                openPositions = positions.filter(position => position.status === "open").length;
            projects.push({
                key: childSnapshot.key,
                name: childSnapshot.child('name').val(),
                description: childSnapshot.child('description').val(), 
                photoUrl: childSnapshot.child('photoUrl').val(),
                openPositions: openPositions
            });
        }
      });
      _self.setState({
          projects: projects,
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
    render() {
      var projects = [];
      for (let i = 0; i < this.state.projects.length; i++) {
        var project = this.state.projects[i];
        if(!this.state.query || project.name.toLowerCase().includes(this.state.query.toLowerCase()))
            projects.push(<Card key={project.key} name={project.name} description={project.description} photoUrl={project.photoUrl} footer={"Open positions: " + project.openPositions} link={"/positions/"+project.key} buttonText="Apply" />);
      }
        return(
            <div>
              <Navbar />
              <br />
              <div className="row">
                    <div className="col-md-6 offset-md-1">
                        <input name="query" value={this.state.query} type="text" className="form-control" onChange={this.handleInputChange.bind(this)} placeholder="search..." />
                    </div>
                    <div className="col-md-1">
                        <button type="button" className="btn btn-primary">Search</button>
                    </div>
              </div>
              <br />
              <div className="card-columns">
                {projects}
              </div>
            </div>
        )
  }
}
  
  export default withRouter(Project);