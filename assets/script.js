var timerText = document.querySelector('.time-left');
var scoreText = document.querySelector('.score');
var allButtons = document.querySelectorAll('.quiz button');
var startScreen = document.querySelector('.start');
var restartScreen = document.querySelector('.restart');
var quizScreen = document.querySelector('.quiz');
var questionText = document.querySelector('.question');
var scoreBoard = document.querySelector('.highscores');
var scoreList = document.querySelector('.score-list');
var scores = localStorage.getItem('scores') == null ? {} : localStorage.getItem('scores');
var currentQuestionId = 0;
var score = 0;
var timeLeft;
var counter;
var initialButton = document.querySelector('#name-button');
var inputName = document.querySelector('#enter-name');

function nextQuestion(start) {
	if (start) {
		startScreen.classList.add('hidden');
		restartScreen.classList.add('hidden');
		quizScreen.classList.remove('hidden');
		scoreText.innerHTML = "Score: 0";
		timerText.innerHTML = "Time Left: 60";
		startTimer();
	} else {
		currentQuestionId++;
		if (currentQuestionId == questions.length) {
			endQuiz();
		}
	}
	for (let i = 0; i < 4; i++) {
		allButtons[i].textContent = questions[currentQuestionId].choices[i];
		questionText.textContent = questions[currentQuestionId].question;
	}
}

function checkAnswer(id) {
	if (id == questions[currentQuestionId].correctAnswer) {
		score++;
		scoreText.innerHTML = "Score: " + score;
	} else {
		timeLeft -= 10;
	}
	nextQuestion();
}

function startTimer(setTime = 60) {
	timeLeft = setTime;
	counter = setInterval(function () {
		if (timeLeft > 0) {
			timeLeft--;
			timerText.innerHTML = "Time Left: " + timeLeft;
		} else {
			endQuiz();
		}
	}, 1000);
}

function endQuiz() {
	currentQuestionId = 0;
	score = 0;
	restartScreen.classList.remove('hidden');
	quizScreen.classList.add('hidden');
	clearInterval(counter);
}

function newScore(name, score) {
	scores[name] = score;
	localStorage.setItem("scores", scores);
}

function setScoreboard() {
	scoreBoard.classList.remove('hidden');
	scoreBoard.textContent = "";
	 for (let key in scores) {
		var listItem = document.createElement("li");
		listItem.innerHTML = "Name: " + key + " Score: " + score[key];
		scoreBoard.appendChild(listItem);

	}
	quizScreen.classList.add('hidden');
	restartScreen.classList.add('hidden');
	startScreen.classList.add('hidden');
}

function setUpQuiz() {

}

function submitInitials() {
	var nameValue = inputName.value
	var savedScores = JSON.parse(localStorage.getItem('Scores-Saved')) || []
	console.log(savedScores) 
}
initialButton.addEventListener('click', submitInitials)
