// STATE

const STATE = {
  score: 0,
  currentQuestion: 0,
  stage: 'NOT STARTED'
}


// VIEWS

function intro() {
  return `<h1 class="title">${QUIZ.title}</h1>
  <form>
    <button class="start" type="submit">Start?</button>
  </form>`
}

function buildAnswers(state) {
  const question = QUIZ.questions[state.currentQuestion];
  let answers = [];
  for(let i = 0; i < question.answers.length; i++) {
    answers.push(`<div class="answer">
    <input data-correct="${question.correct}" type="radio" name="answer${i}" id="answer${i}">
    <label for="answer${i}">${question.answers[i]}</label>
</div>`);
  }
  return answers.join('');
}

function questionsView(state){
  const question = QUIZ.questions[state.currentQuestion];
  return `<div class="questions">
  <p>Question ${state.currentQuestion} of ${QUIZ.questions.length}</p>
  <h3>${question.text}</h3>
  <form>
    ${buildAnswers(state)}
    <button type="submit">Submit and next question</button>
  </form>`
}

function startQuiz() {
  // this will start the quiz
  // updating STATE.stage to 'QUESTIONS' from 'NOT STARTED'
  $('.app').submit(e => {
    e.preventDefault();
    STATE.stage = 'QUESTIONS';
    renderQuiz();
  });
}

function getQuestion() {
  // this updates the currentQuestion in STATE
  $('.app').submit(function(e) {
    e.preventDefault();
    STATE.currentQuestion ++;
    checkAnswer();
  })
}

function checkAnswer(QUIZ, target) {
  // this will check the user's answer against the correct answer determining which view goes next
  if(QUIZ.questions[STATE.currentQuestion].correct === target) {
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
    view = intro();
    startQuiz();
  } else if (STATE.stage === 'QUESTIONS') {
    view = questionsView(STATE);
    getQuestion();
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