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
      studentName: '',
      answers:{
        answer1:'',
        answer2:'',
        answer3:''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }
  answerSelected(event){
    var answers = this.state.answers;
    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    }
    else if(event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    }else if(event.target.name === 'answer3'){
      answers.answer3 = event.target.value;
    }
    this.setState({answers:answers}, function(){
      console.log(this.state);
    });
  }
  questionSubmit(){
    firebase.database().ref('uSurvey/' + this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted:true});
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
          <form onSubmit={this.questionSubmit}>
            <div className = 'card'>
              <label>What kind of courses do you like the most?</label><br/>
              <input type = 'radio' name = 'answer1' value = 'technology' onChange = {this.answerSelected}/>technology
              <input type = 'radio' name = 'answer1' value = 'marketing' onChange = {this.answerSelected}/>marketing
              <input type = 'radio' name = 'answer1' value = 'art' onChange = {this.answerSelected}/>art
            </div>
            <div className = 'card'>
              <label>What are you?</label><br/>
              <input type = 'radio' name = 'answer2' value = 'student' onChange = {this.answerSelected}/>student
              <input type = 'radio' name = 'answer2' value = 'working'onChange = {this.answerSelected}/>working
              <input type = 'radio' name = 'answer2' value = 'looking for work'onChange = {this.answerSelected}/>looking for work
            </div>
            <div className = 'card'>
              <label>Is online learning helpful?</label><br/>
              <input type = 'radio' name = 'answer3' value = 'yes' onChange = {this.answerSelected}/>yes
              <input type = 'radio' name = 'answer3' value = 'no'onChange = {this.answerSelected}/>no
              <input type = 'radio' name = 'answer3' value = 'maybe for work'onChange = {this.answerSelected}/>maybe
            </div>
            <input className='feedback-button' type = 'submit' value = 'submit'/>
          </form>
        </div>
    } else if (this.state.isSubmitted === true){
      studentName = <h1>Thanks {this.state.studentName}</h1>
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
