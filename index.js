const STATE = {
  score: 0,
  currentQuestion: QUIZ.questions[0],
  stage: 'NOT STARTED'
}

function startQuiz() {
  // this will start the quiz
  // updating STATE.stage to 'QUESTIONS' from 'NOT STARTED'
  
}

function getQuestion(QUIZ) {
  // this will retrieve the next question from the QUIZ object
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

function displayQuestionNum() {
  // this will get the question number displaying x of 10
}

function rightOrWrongFeedback() {
  // this will get the result of checkAnswer and determine the feedback to display to the user
}

function trackScore() {
  // this will increment score based on checkAnswer result
}

function displayScore() {
  // will get score at the end of the quiz and display to user.
}

function renderQuiz(STATE, QUIZ) {
  // takes quiz, views and state to render the proper view
  const view = intro;
  $('.app').html(view)

}

$(function(){
  renderQuiz();
})