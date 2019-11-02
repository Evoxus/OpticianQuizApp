function startQuiz() {
  // this will start the quiz
  // updating STATE.stage to 'QUESTIONS' from 'NOT STARTED'
  $('.app').on('click', function(e){
    e.preventDefault();
    console.log(event);
    STATE.stage = 'QUESTIONS';
  })
}

function getQuestion() {
  // this updates the currentQuestion in STATE
  STATE.currentQuestion += 1;
}

function checkAnswer(QUIZ) {
  // this will check the user's answer against the correct answer determining which view goes next
  if(QUIZ.questions[STATE.currentQuestion].correct === null/*userInput*/) {
    return true;
  } else {
    return false;
  }
}

function preventSkip() {
  // this will check user has selected an input otherwise preventing moving forward
}

/* UNNEEDED? JUST GET INDEX OF QUESTION AND ADD 1 IN RENDER
function QuestionNum() {
//   // this will get the question number displaying x of 10

}*/

function rightOrWrongFeedback() {
  // this will get the result of checkAnswer and determine the feedback to display to the user
}

function trackScore() {
  // this will increment score based on checkAnswer result
  if(checkAnswer()) {
    STATE.score += 1;
  }
}
/* UNNEEDED? JUST GET SCORE FROM STATE AND PLUG INTO VIEW
function displayScore() {
  // will get score at the end of the quiz and display to user.

}*/

function determineView() {
  let view;
  if(STATE.stage === 'NOT STARTED') {
    view = intro;
  } else if (STATE.stage === 'QUESTIONS') {
    view = questions;
  } else if (STATE.stage === 'RIGHT ANSWER') {
    view = correctAnswer;
  } else if (STATE.stage === 'WRONG ANSWER') {
    view = wrongAnswer;
  } else if (STATE.stage === 'FINISHED') {
    view = end;
  }
  return view;
}

function renderQuiz(QUIZ) {
  // takes quiz, views and state to render the proper view
  const currentView = determineView(STATE);
  $('.app').html(currentView);

}

$(function(){
  renderQuiz();
})