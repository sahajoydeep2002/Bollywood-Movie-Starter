import React from 'react';
import Navbar from './Navbar';
import Position from './Position';
import { withRouter } from 'react-router-dom';

var firebase = window.firebase;

class Positions extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
        positions: []
    }
    this.applyBind = this.apply.bind(this);
  }
  componentDidMount(){
    var _self = this;
    if(!firebase.auth().currentUser){
        _self.props.history.push("/");
        return;
    }
    var database = firebase.database();
    var projectId = _self.props.match.params.id
    var positions = [];
    database.ref('projects/' + projectId + "/positions").once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        positions.push({
            key: childSnapshot.key,
            title: childSnapshot.child('title').val(),
            description: childSnapshot.child('description').val(), 
            status: childSnapshot.child('status').val()
        });
      });
      _self.setState({
        positions: positions,
      });
    }); 
  }
  apply(index){
      var _self = this;
      var database = firebase.database();
    var projectId = _self.props.match.params.id
    database.ref('projects/' + projectId + "/positions/" +index+"/status").set("closed").then(function(){
        _self.props.history.push("/projects");
    });
  }
    render() {
        var _self = this;
      var positions = [];
      for (let i = 0; i < this.state.positions.length; i++) {
        var position = this.state.positions[i];
        positions.push(<Position key={i} title={position.title} description={position.description} onClick={() => _self.applyBind(i)} />);
      }
        return(
            <div>
              <Navbar />
              <br />
              <div className="list-group">
                {positions}
              </div>
            </div>
        )
  }
}
  
  export default withRouter(Positions);