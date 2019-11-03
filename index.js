// STATE
const STATE = {
  score: 0,
  currentQuestion: 0,
  stage: 'NOT STARTED'
}

// VIEWS
function intro() {
  return `<form>
    <button class="start" type="submit">Start?</button>
  </form>`
}

function buildAnswers(state) {
  const question = QUIZ.questions[state.currentQuestion];
  const answers = [];
  for(let i = 0; i < question.answers.length; i++) {
    answers.push(`<div class="answer">
    <input type="radio" name="answer" id="answer${i}"
    value="${question.answers[i]}">
    <label for="answer">${question.answers[i]}</label>
</div>`);
  }
  return answers.join('');
}

function questionsView(state){
  const question = QUIZ.questions[state.currentQuestion];
  return `<div class="questions">
  <p>Question ${state.currentQuestion + 1} of ${QUIZ.questions.length}</p>
  <p>Score: ${state.score}</p>
  <h3>${question.text}</h3>
  <form id='js-quiz'>
    ${buildAnswers(state)}
    <button class="question-submit" type="submit">Submit and next question</button>
  </form>`
}

// HANDLERS
function startQuiz() {
  // this will start the quiz
  $('.app').on('click', '.start', e => {
    e.preventDefault();
    STATE.stage = 'QUESTIONS';
    renderQuiz(QUIZ);
  });
}

function handleQuestionSubmit() {
  $('.app').on('click', '.question-submit', function(e) {
    e.preventDefault();

    let question = QUIZ.questions[STATE.currentQuestion];
    let selectedAnswer = $("input[name=answer]:checked").val();
    // Check that answer is selected and prevent skip if not.
    if (!selectedAnswer) {
      alert("Please choose an answer to continue.");
      return;
    }

    let id_num = question.answers.findIndex(i => i === selectedAnswer);

    if(checkAnswer(QUIZ, id_num)) {
      console.log('right answer');
      STATE.currentQuestion ++;
      STATE.score ++;
      renderQuiz(QUIZ);
    } else if (!checkAnswer(QUIZ, id_num)) {
      console.log('Wrong answer')
      STATE.currentQuestion ++;
      renderQuiz(QUIZ);
    }
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

function trackScore() {
  // this will increment score based on checkAnswer result
  if(checkAnswer()) {
    STATE.score += 1;
  }
}

function determineView() {
  let view;
  if(STATE.stage === 'NOT STARTED') {
    view = intro();
  } else if (STATE.stage === 'QUESTIONS') {
    view = questionsView(STATE);
  } else if (STATE.stage === 'NO ANSWER') {
    view = noAnswerView();
  } else if (STATE.stage === 'RIGHT ANSWER') {
    view = correctAnswerView();
  } else if (STATE.stage === 'WRONG ANSWER') {
    view = wrongAnswerView();
  } else if (STATE.stage === 'FINISHED') {
    view = endView();
  }
  return view;
}

function handleQuiz() {
  startQuiz();
  handleQuestionSubmit();
}

function renderQuiz(QUIZ) {
  // takes quiz, views and state to render the proper view
  $('.header').html(`<h1 class="title">${QUIZ.title}</h1>`)
  const currentView = determineView(STATE);
  $('.app').html(currentView);
}

$(function(){
  renderQuiz(QUIZ);
  handleQuiz();
})