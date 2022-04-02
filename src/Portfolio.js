import React from 'react';
import Navbar from './Navbar';
import Card from './Card';
import { withRouter } from 'react-router-dom';
import {
  Link
} from "react-router-dom";

var firebase = window.firebase;

class Portfolio extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
        projects: []
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
    database.ref('/users/' + userId + '/projects').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        projects.push({
          key: childSnapshot.key,
          name: childSnapshot.child('name').val(),
          description: childSnapshot.child('description').val(), 
          photoUrl: childSnapshot.child('photoUrl').val()
        });
      });
      _self.setState({
          projects: projects,
      });
    }); 
  }
    render() {
      var projects = [];
      for (let i = 0; i < this.state.projects.length; i++) {
        var project = this.state.projects[i];
        projects.push(<Card key={project.key} name={project.name} description={project.description} photoUrl={project.photoUrl} link="#" buttonText="Manage" />);
      }
        return(
            <div>
              <Navbar />
              <br />
              <div>
                <Link className="btn btn-primary" to="/create-project">Create Project</Link>
              </div>
              <br />
              <div className="card-columns">
                {projects}
              </div>
            </div>
        )
  }
}
  
  export default withRouter(Portfolio);