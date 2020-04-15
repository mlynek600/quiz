const quizURL = 'https://opentdb.com/api.php?amount=50';
const questionBtn = document.querySelector('.question-btn');
const questionText = document.querySelector('.question-text');
const answerBtn1 = document.querySelector('.answer1');
const answerBtn2 = document.querySelector('.answer2');
const answerBtn3 = document.querySelector('.answer3');
const answerBtn4 = document.querySelector('.answer4');
const score = document.querySelector('.score');
const isCorrectMsg = document.querySelector('.is-correct');
const questionsLeft = document.querySelector('.questions-left');
const tryAgainBtn = document.querySelector('.try-again');
const finishBtn = document.querySelector('.finish');
const results = document.querySelector('.results');
const timer = document.querySelector('.timer');
let correctAnswerBtn;
let currentQuestion;
let questions;
let points = 0;
let isCorrect;
let questionsToEnd = 10;
let endMsg;
let time;
let timerID;

restart();

function restart() {
  fetch(quizURL)
    .then(response => response.json())
    .then(json => {
      questions = json.results;
      questionBtn.style = 'visibility: visible';
    });

  timer.style = 'visibility: hidden';
  tryAgainBtn.style = 'visibility: hidden';
  questionsToEnd = 10;
  questionsLeft.innerText = `Questions left: ${questionsToEnd}`;
  points = 0;
  score.innerText = `Your score: ${points}`;
  questionText.innerHTML = '';
  answerBtn1.style = 'visibility: hidden';
  answerBtn2.style = 'visibility: hidden';
  answerBtn3.style = 'visibility: hidden';
  answerBtn4.style = 'visibility: hidden';
  isCorrectMsg.innerText = '';
  questionBtn.disabled = false;
  finishBtn.style = 'display: none';
  results.innerText = '';
}

function timing() {
  timer.innerText = `Time: ${time}`;
  time -= 1;
  if (time == -1) {
    timer.innerText = 'Out of time!';
    stopTiming();
    points -= 3;
    score.innerText = `Your score: ${points}`;
    answerBtn1.disabled = true;
    answerBtn2.disabled = true;
    answerBtn3.disabled = true;
    answerBtn4.disabled = true;
  }
}

function stopTiming() {
  clearInterval(timerID);
}

function pullQuestion() {
  stopTiming();
  time = 10;
  timer.innerText = `Time: ${time}`;
  timer.style = 'visibility: visible';
  timerID = setInterval(timing, 1000);
  showQuestion();
  questionsToEnd -= 1;
  questionsLeft.innerText = `Questions: ${questionsToEnd}`;

  if (questionsToEnd == 0) {
    finish()
  }

  isCorrectMsg.innerText = "";
  answerBtn1.disabled = false;
  answerBtn2.disabled = false;
  answerBtn3.disabled = false;
  answerBtn4.disabled = false;
  answerBtn1.style = 'visibility: visible';
  answerBtn2.style = 'visibility: visible';
  if (questions[currentQuestion].incorrect_answers.length == 3) {
    answerBtn3.style = 'visibility: visible';
    answerBtn4.style = 'visibility: visible';
  }
  if (questions[currentQuestion].incorrect_answers.length == 1) {
    answerBtn3.style = 'visibility: hidden';
    answerBtn4.style = 'visibility: hidden';
  }
  showAnswers();
}

function showQuestion() {
  currentQuestion = getRandomIntInclusive(0, 49);
  questionText.innerHTML = questions[currentQuestion].question;
}

function showAnswers() {
  if (questions[currentQuestion].incorrect_answers.length == 3) {
    correctAnswerBtn = getRandomIntInclusive(1, 4);
    switch (correctAnswerBtn) {
      case 1:
        answerBtn1.innerHTML = questions[currentQuestion].correct_answer;
        answerBtn2.innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerBtn3.innerHTML = questions[currentQuestion].incorrect_answers[1];
        answerBtn4.innerHTML = questions[currentQuestion].incorrect_answers[2];
        break;
      case 2:
        answerBtn1.innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerBtn2.innerHTML = questions[currentQuestion].correct_answer;
        answerBtn3.innerHTML = questions[currentQuestion].incorrect_answers[1];
        answerBtn4.innerHTML = questions[currentQuestion].incorrect_answers[2];
        break;
      case 3:
        answerBtn1.innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerBtn2.innerHTML = questions[currentQuestion].incorrect_answers[1];
        answerBtn3.innerHTML = questions[currentQuestion].correct_answer;
        answerBtn4.innerHTML = questions[currentQuestion].incorrect_answers[2];
        break;
      case 4:
        answerBtn1.innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerBtn2.innerHTML = questions[currentQuestion].incorrect_answers[1];
        answerBtn3.innerHTML = questions[currentQuestion].incorrect_answers[2];
        answerBtn4.innerHTML = questions[currentQuestion].correct_answer;
        break;
    }
  } else {
    correctAnswerBtn = getRandomIntInclusive(1, 2);
    switch (correctAnswerBtn) {
      case 1:
        answerBtn1.innerHTML = questions[currentQuestion].correct_answer;
        answerBtn2.innerHTML = questions[currentQuestion].incorrect_answers[0];
        break;
      case 2:
        answerBtn1.innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerBtn2.innerHTML = questions[currentQuestion].correct_answer;
        break;
    }
  }
}

function checkAnswer(event) {
  switch (event.target) {
    case answerBtn1:
      if (correctAnswerBtn == 1) {
        points += 5;
        isCorrect = true;
      } else {
        points -= 3;
        isCorrect = false;
      }
      break;
    case answerBtn2:
      if (correctAnswerBtn == 2) {
        points += 5;
        isCorrect = true;
      } else {
        points -= 3;
        isCorrect = false;
      }
      break;
    case answerBtn3:
      if (correctAnswerBtn == 3) {
        points += 5;
        isCorrect = true;
      } else {
        points -= 3;
        isCorrect = false;
      }
      break;
    case answerBtn4:
      if (correctAnswerBtn == 4) {
        points += 5;
        isCorrect = true;
      } else {
        points -= 3;
        isCorrect = false;
      }
      break;
  }
  stopTiming();
  score.innerText = `Your score: ${points}`;
  isCorrectMsg.innerText = (isCorrect) ? 'Correct!' : "Wrong!";
  answerBtn1.disabled = true;
  answerBtn2.disabled = true;
  answerBtn3.disabled = true;
  answerBtn4.disabled = true;
}

function finish() {
  questionBtn.disabled = true;
  finishBtn.style = 'display: block';
}

function showResult() {
  stopTiming();
  if (points >= 30) {
    endMsg = 'Impressive result! 😁';
  } else if (points >= 20) {
    endMsg = 'Very good! 😀';
  } else if (points >= 10) {
    endMsg = 'Nice! 😉';
  } else if (points >= 0) {
    endMsg = 'You can be better! 😏';
  } else {
    endMsg = 'Maybe next time? 😅';
  }
  results.innerHTML = `<h4>${endMsg}</h4>`
  tryAgainBtn.style = 'visibility: visible';
  finishBtn.style = 'display: none';
  answerBtn1.disabled = true;
  answerBtn2.disabled = true;
  answerBtn3.disabled = true;
  answerBtn4.disabled = true;
  isCorrectMsg.innerText = '';
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function musicPlay() {
  document.getElementById('song').play();
  document.removeEventListener('click', musicPlay);
}

questionBtn.addEventListener('click', pullQuestion);
answerBtn1.addEventListener('click', checkAnswer);
answerBtn2.addEventListener('click', checkAnswer);
answerBtn3.addEventListener('click', checkAnswer);
answerBtn4.addEventListener('click', checkAnswer);
tryAgainBtn.addEventListener('click', restart);
finishBtn.addEventListener('click', showResult);
document.addEventListener('click', musicPlay);
