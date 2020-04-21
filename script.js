const quizURL = 'https://opentdb.com/api.php?amount=50';
const questionBtn = document.querySelector('.question-btn');
const questionText = document.querySelector('.question-text');
const answerButtons = [ document.querySelector('.answer1'),
                        document.querySelector('.answer2'),
                        document.querySelector('.answer3'),
                        document.querySelector('.answer4'), ];
const score = document.querySelector('.score');
const isCorrectMsg = document.querySelector('.is-correct');
const questionsLeft = document.querySelector('.questions-left');
const tryAgainBtn = document.querySelector('.try-again');
const finishBtn = document.querySelector('.finish');
const results = document.querySelector('.results');
const timer = document.querySelector('.timer');
const shaker = document.querySelector('.shaker');
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
  score.style = "color: black";
  timer.style = 'visibility: hidden';
  tryAgainBtn.style = 'visibility: hidden';
  questionsToEnd = 10;
  questionsLeft.innerText = `Questions left: ${questionsToEnd}`;
  points = 0;
  score.innerText = `Your score: ${points}`;
  questionText.innerHTML = '';
  hideAnswerButtons();
  isCorrectMsg.innerText = '';
  questionBtn.disabled = false;
  finishBtn.style = 'display: none';
  results.innerText = '';
}

function hideAnswerButtons() {
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].style = 'visibility: hidden';
  }
}

function disableAnswerButtons() {
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].disabled = true;
  }
}

function undisableAnswerButtons() {
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].disabled = false;
  }
}

function timing() {
  timer.innerText = `Time: ${time}`;
  time -= 1;
  if (time == -1) {
    timer.innerText = 'Out of time!';
    shaker.style = 'animation: shake 3s infinite';
    stopTiming();
    points -= 3;
    score.innerText = `Your score: ${points}`;
    disableAnswerButtons();
  }
}

function stopTiming() {
  clearInterval(timerID);
}

function pullQuestion() {
  shaker.style = '';
  stopTiming();
  time = 15;
  timer.innerText = `Time: ${time}`;
  timer.style = 'visibility: visible';
  timerID = setInterval(timing, 1000);
  showQuestion();
  questionsToEnd -= 1;
  questionsLeft.innerText = `Questions: ${questionsToEnd}`;

  if (questionsToEnd == 0) {
    finish();
  }

  isCorrectMsg.innerText = "";
  undisableAnswerButtons();
  answerButtons[0].style = 'visibility: visible';
  answerButtons[1].style = 'visibility: visible';
  if (questions[currentQuestion].incorrect_answers.length == 3) {
    answerButtons[2].style = 'visibility: visible';
    answerButtons[3].style = 'visibility: visible';
  }
  if (questions[currentQuestion].incorrect_answers.length == 1) {
    answerButtons[2].style = 'visibility: hidden';
    answerButtons[3].style = 'visibility: hidden';
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
        answerButtons[0].innerHTML = questions[currentQuestion].correct_answer;
        answerButtons[1].innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerButtons[2].innerHTML = questions[currentQuestion].incorrect_answers[1];
        answerButtons[3].innerHTML = questions[currentQuestion].incorrect_answers[2];
        break;
      case 2:
        answerButtons[0].innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerButtons[1].innerHTML = questions[currentQuestion].correct_answer;
        answerButtons[2].innerHTML = questions[currentQuestion].incorrect_answers[1];
        answerButtons[3].innerHTML = questions[currentQuestion].incorrect_answers[2];
        break;
      case 3:
        answerButtons[0].innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerButtons[1].innerHTML = questions[currentQuestion].incorrect_answers[1];
        answerButtons[2].innerHTML = questions[currentQuestion].correct_answer;
        answerButtons[3].innerHTML = questions[currentQuestion].incorrect_answers[2];
        break;
      case 4:
        answerButtons[0].innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerButtons[1].innerHTML = questions[currentQuestion].incorrect_answers[1];
        answerButtons[2].innerHTML = questions[currentQuestion].incorrect_answers[2];
        answerButtons[3].innerHTML = questions[currentQuestion].correct_answer;
        break;
    }
  } else {
    correctAnswerBtn = getRandomIntInclusive(1, 2);
    switch (correctAnswerBtn) {
      case 1:
        answerButtons[0].innerHTML = questions[currentQuestion].correct_answer;
        answerButtons[1].innerHTML = questions[currentQuestion].incorrect_answers[0];
        break;
      case 2:
        answerButtons[0].innerHTML = questions[currentQuestion].incorrect_answers[0];
        answerButtons[1].innerHTML = questions[currentQuestion].correct_answer;
        break;
    }
  }
}

function checkAnswer(event) {
  switch (event.target) {
    case answerButtons[0]:
      if (correctAnswerBtn == 1) {
        points += 5;
        isCorrect = true;
      } else {
        points -= 3;
        isCorrect = false;
      }
      break;
    case answerButtons[1]:
      if (correctAnswerBtn == 2) {
        points += 5;
        isCorrect = true;
      } else {
        points -= 3;
        isCorrect = false;
      }
      break;
    case answerButtons[2]:
      if (correctAnswerBtn == 3) {
        points += 5;
        isCorrect = true;
      } else {
        points -= 3;
        isCorrect = false;
      }
      break;
    case answerButtons[3]:
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
  if (points > 0) {
    score.style = "color: green";
  } else if (points < 0) {
    score.style = "color: red";
  }
  score.innerText = `Your score: ${points}`;
  isCorrectMsg.innerText = (isCorrect) ? 'Correct!' : "Wrong!";
  disableAnswerButtons();
}

function finish() {
  questionBtn.disabled = true;
  finishBtn.style = 'display: block';
}

function showResult() {
  stopTiming();
  shaker.style = '';
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
  disableAnswerButtons();
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
answerButtons[0].addEventListener('click', checkAnswer);
answerButtons[1].addEventListener('click', checkAnswer);
answerButtons[2].addEventListener('click', checkAnswer);
answerButtons[3].addEventListener('click', checkAnswer);
tryAgainBtn.addEventListener('click', restart);
finishBtn.addEventListener('click', showResult);
document.addEventListener('click', musicPlay);
