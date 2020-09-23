let question = document.getElementById('question-title');
let mainCard = document.getElementById('main-card');
let startBtn = document.getElementById('startBtn');
let answerForm = document.getElementById('answer-form');
let nextBtn = document.getElementById('nextBtn');
let skipBtn = document.getElementById('skipBtn');
let gameInfo = document.getElementById('game-info');
let viewQuestion = document.getElementById('view-question-number');
let questionNumber = document.getElementById('question-number');
let answer = document.getElementById('answer');
let wrongAnswerCount = document.getElementById('wrong-answers-count');
let score = document.getElementById('score');
let count = 0;
let playerPoints = 0;
let playerLives = 3;

// Get question

async function getAsyncQuestion() {
  count++;
  const res = await fetch('http://jservice.io/api/random?count=1');
  const data = await res.json();
  questionNumber.innerText = count;
  question.innerText = data[0].question;
  localStorage.setItem('questionNumber', count);
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
    playerPoints += 10;
    localStorage.setItem('playerPoints', playerPoints);
    score.innerText = playerPoints;
    console.log(playerPoints);
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
    playerLives -= 1;
    localStorage.setItem('playerLives', playerLives);
    wrongAnswerCount.innerText = playerLives;
    if (playerLives != 0) {
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
      console.log(playerLives);
    } else {
      viewQuestion.style.visibility = 'hidden';
      nextBtn.style.visibility = 'hidden';
      skipBtn.style.visibility = 'hidden';
      answerForm.style.visibility = 'hidden';
      question.innerHTML =
        'YOU LOST!<br><br>Enter your name below and check the leaderboards!';
      let playerName = document.createElement('div');
      playerName.innerHTML = `
      <form>
        <label class="col-form-label player-name-label" for="playerName">Enter your name</label>
        <input type="text" class="form-control player-name-input" placeholder="Your name..." id="playerName">
        <button type="button" class="btn btn-outline-success submit-player-name-btn" id="submitBtn">
          Submit
        </button>
      </form>
      `;
      playerName.className = 'form-group';
      mainCard.appendChild(playerName);
    }
  }
}

// Skip a question

async function skipQuestion() {
  if (playerPoints != 0) {
    count++;
    const res = await fetch('http://jservice.io/api/random?count=1');
    const data = await res.json();
    questionNumber.innerText = count;
    question.innerText = data[0].question;
    playerPoints -= 5;
    score.innerText = playerPoints;
    localStorage.setItem('playerPoints', playerPoints);
    localStorage.setItem('currentQuestion', data[0].question);
    localStorage.setItem('currentQuestionAnswer', data[0].answer);
  } else {
    skipBtn.innerText = 'You need at least 5 points to skip';
    setTimeout(function () {
      skipBtn.innerText = 'Skip :(';
    }, 2000);
  }
}

// Event listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', checkAnswer);
skipBtn.addEventListener('click', skipQuestion);
