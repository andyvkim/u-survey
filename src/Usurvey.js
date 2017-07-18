import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');
var config = {
    apiKey: "AIzaSyBJ_yGKwyVcIuGUGqilMLpY0qNSShFtlcA",
    authDomain: "usurvey-94e17.firebaseapp.com",
    databaseURL: "https://usurvey-94e17.firebaseio.com",
    projectId: "usurvey-94e17",
    storageBucket: "usurvey-94e17.appspot.com",
    messagingSenderId: "527766594517"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function(){
      console.log(this.state);
    });

  }
  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: 'krillin',
      answers:{
        answer1:'',
        answer2:'',
        answer3:''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
  }

  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h1>Hey student, please let us know your name: </h1>
        <form onSubmit={this.nameSubmit}>
          <input className = 'namy' type = 'text' placeholder = 'enter your name' ref = 'name'/>
        </form>
      </div>;
      questions = '';
    }else if(this.state.studentName !== '' && this.state.isSubmitted === false){
      studentName = <h1>Hey there, {this.state.studentName}</h1>;
        questions = <div>
          <h2>Here are some questions: </h2>
          <form>
            <div className = 'card'>
              <label>What kind of courses do you like the most?</label><br/>
            </div>
          </form>
        </div>
    }


    return(
      <div>
        {studentName}
        --------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
