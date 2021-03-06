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
  </form>`;
}

function buildAnswers(state) {
  const question = QUIZ.questions[state.currentQuestion];
  const answers = [];
  for(let i = 0; i < question.answers.length; i++) {
    answers.push(`<section class="answer">
    <label>
      <input type="radio" name="answer" id="answer${i}"
      value="${question.answers[i]}" tabindex="${i+1}">
      ${question.answers[i]}
    </label>
</section>`);
  }
  return answers.join('');
}

function questionsView(state){
  const question = QUIZ.questions[STATE.currentQuestion];
  return `<section class="questions">
    <p>Question ${state.currentQuestion + 1} of ${QUIZ.questions.length}</p>
    <p>Score: ${state.score}</p>
      <form id='js-quiz'>
        <fieldset>
          <legend>${question.text}</legend>
          <div class="radio-container">
            ${buildAnswers(state)}
          </div>
          <button class="question-submit" type="submit">Submit and next question</button>
        </fieldset>
      </form>
  </section>`;
}
function correctAnswerView() {
  return `<section class="right-answer">
    <p>Question ${STATE.currentQuestion + 1} of ${QUIZ.questions.length}</p>
    <p>Score: ${STATE.score}</p>
    <h3>Right you are!</h3>
    <form>
      <button class="continue" type="submit">Continue</button>
    </form>
  </section>
  `;
}

function wrongAnswerView() {
  const question = QUIZ.questions[STATE.currentQuestion];
  return `<section class="wrong-answer">
    <p>Question ${STATE.currentQuestion + 1} of ${QUIZ.questions.length}</p>
    <p>Score: ${STATE.score}</p>
    <h3>Not quite</h3>
    <p>The answer to <strong>${question.text}</strong> is: </p>
    <p>${question.answers[question.correct]}</p>
    <form>
      <button class="continue" type="submit">Continue</button>
    </form>
  </section>`;
}

function endView() {
  const quizLength = QUIZ.questions.length;
  if(STATE.score === quizLength) {
    return `<section class="end">
      <h3>Well done Master Yoda</h3>
      <h5>Got them all right you did</h5>
      <form>
        <button class="start" type="submit">Start again?</button>
      </form>
    </section>
    `;
  } else if (STATE.score > quizLength / 2) {
    return `<section class="end">
      <h3>Yoda you are not, but Qui-Gon would be proud</h3>
      <h5>You got ${STATE.score} of ${quizLength} right</h5>
      <form>
        <button class="start" type="submit">Start again?</button>
      </form>
    </section>
    `;
  } else {
    return `<section class="end">
      <h3>You still have much to learn young Padawan</h3>
      <h5>You got ${STATE.score} of ${quizLength} right</h5>
      <form>
        <button class="start" type="submit">Start again?</button>
      </form>
    </section>`;
  }
}

// HANDLERS
function startQuiz() {
  // this will start or restart the quiz
  $('.app').on('click', '.start', e => {
    e.preventDefault();
    STATE.stage = 'QUESTIONS';
    STATE.currentQuestion = 0;
    STATE.score = 0;
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
    // if(STATE.currentQuestion + 1 !== QUIZ.questions.length) {
      if(checkAnswer(QUIZ, id_num)) {
        STATE.score ++;
        STATE.stage = 'RIGHT ANSWER';
        renderQuiz(QUIZ);
      } else if (!checkAnswer(QUIZ, id_num)) {
        STATE.stage = 'WRONG ANSWER';
        renderQuiz(QUIZ);
      }
    /* }  else {
      if(checkAnswer(QUIZ, id_num)) {
        STATE.stage = 'FINISHED';
        STATE.score ++;
        renderQuiz(QUIZ);
      } else if (!checkAnswer(QUIZ, id_num)) {
        STATE.stage = 'FINISHED';
        renderQuiz(QUIZ);
      }
    }*/
  });
}

function checkAnswer(QUIZ, target) {
  // this will check the user's answer against the correct answer determining which view goes next
  if(QUIZ.questions[STATE.currentQuestion].correct === target) {
    return true;
  } else {
    return false;
  }
}

function handleFeedbackContinue() {
  $('.app').on('click', '.continue', function(e) {
    e.preventDefault();
    if(STATE.currentQuestion + 1 !== QUIZ.questions.length) {
      STATE.stage = 'QUESTIONS';
      STATE.currentQuestion ++;
      renderQuiz(QUIZ);
    } else {
      STATE.stage = 'FINISHED';
      renderQuiz(QUIZ);
    }
  });
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
  // This function sets all the listeners initially
  startQuiz();
  handleQuestionSubmit()
  handleFeedbackContinue();
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