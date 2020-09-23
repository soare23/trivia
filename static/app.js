let question = document.getElementById('question-title');
let startBtn = document.getElementById('startBtn');
let answerForm = document.getElementById('answer-form');
let nextBtn = document.getElementById('nextBtn');
let skipBtn = document.getElementById('skipBtn');
let gameInfo = document.getElementById('game-info');
let viewQuestion = document.getElementById('view-question-number');
let questionNumber = document.getElementById('question-number');
let answer = document.getElementById('answer');
let count = 0;

// Get question

async function getAsyncQuestion() {
  count++;
  const res = await fetch('http://jservice.io/api/random?count=1');
  const data = await res.json();
  console.log(data[0].answer);
  questionNumber.innerText = count;
  localStorage.setItem('currentQuestion', data[0].question);
  localStorage.setItem('currentQuestionAnswer', data[0].answer);
}

// Start trivia

function startGame() {
  getAsyncQuestion();
  question.innerText = localStorage.getItem('currentQuestion');
  startBtn.style.visibility = 'hidden';
  gameInfo.style.display = 'none';
  viewQuestion.style.visibility = 'visible';
  nextBtn.style.visibility = 'visible';
  skipBtn.style.visibility = 'visible';
  answerForm.style.visibility = 'visible';
}

// Check for correct answer

function checkAnswer() {
  if (answer.value == localStorage.getItem('currentQuestionAnswer')) {
    console.log('correct answer');
    let answerAlert = document.createElement('div');
    answerAlert.innerHTML = 'CORRECT';
    answerAlert.className = 'btn-success answer-info';
    answerForm.appendChild(answerAlert);
    setTimeout(function () {
      answerForm.removeChild(answerAlert);
      answer.value = '';
      getAsyncQuestion();
      question.innerText = localStorage.getItem('currentQuestion');
    }, 2000);
  } else {
    console.log('wrong answer');
    let answerAlert = document.createElement('div');
    answerAlert.innerHTML = 'WRONG';
    answerAlert.className = 'btn-danger answer-info';
    answerForm.appendChild(answerAlert);
    setTimeout(function () {
      answerForm.removeChild(answerAlert);
      answer.value = '';
      getAsyncQuestion();
      question.innerText = localStorage.getItem('currentQuestion');
    }, 2000);
  }
}

// Event listeners
startBtn.addEventListener('click', startGame);

nextBtn.addEventListener('click', checkAnswer);
