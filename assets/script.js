//Game Functions - lots of reference from https://www.youtube.com/watch?v=riDzcEQbX6k


var startButton = document.querySelector('#start-button')
var finishButton = document.querySelector('#finish-button')
var questionBox = document.querySelector('#question')
var directionsBox = document.querySelector('#direction-buttons')
var prevButton = document.querySelector('#prevButton')
var nextButton = document.querySelector('#nextButton')
var multipleChoice = document.querySelector('#multichoice')
var scoreForm = document.querySelector('#score-form')
var scoreHere = document.querySelector('#score-here')

var currentQuestion
var firstQuestion

function init() {
  getScore()
}




startButton.addEventListener('click', startGame)
finishButton.addEventListener('click', finishGame)
nextButton.addEventListener("click", function() {
  firstQuestion++;
  showFirstQuestion();
})
prevButton.addEventListener("click", function() {
  firstQuestion--;
  showFirstQuestion();
})

//clicking Start pulls questions, removes start button, shows rest of quiz, starts timer
function startGame() {
  console.log('Started')
  currentQuestion = questions.sort()
  firstQuestion = 0
  startButton.classList.add('hide')
  questionBox.classList.remove('hide')
  prevButton.classList.remove('hide')
  nextButton.classList.remove('hide')
  multipleChoice.classList.remove('hide')
  showFirstQuestion()
  setTime()
}


function showFirstQuestion () {
  resetQuiz()
  showQuestion(currentQuestion[firstQuestion]);
}


function showQuestion(questions) {
  questionBox.innerText = questions.question;
  questions.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('choice')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', userAnswer);
    multipleChoice.appendChild(button)
  })
}

function resetQuiz() { //Debug: prev button only shows up on last question
  prevButton.classList.add('hide')
  if (currentQuestion.length == firstQuestion + 1) {
    prevButton.classList.remove('hide')
  }
  nextButton.classList.add('hide')
  while (multipleChoice.firstChild) {
    multipleChoice.removeChild(multipleChoice.firstChild)
  }
}

function userAnswer(event) {
  var clickedAnswer = event.currentTarget
  var correct = clickedAnswer.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(multipleChoice.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (currentQuestion.length > firstQuestion + 1 ) {
    nextButton.classList.remove('hide')
  }
  else {
    finishButton.classList.remove('hide')
    prevButton.classList.add('hide')
    questionBox.classList.add('hide')
    multipleChoice.classList.add('hide')
  }
}
//Debug: last question does not show correct/incorrect class changes


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  }
  // debug: does not decrease time - where do i put this?
  // var incorrectAnswerClick = document.querySelector('.incorrect')
  // incorrectAnswerClick.addEventListener("click", function() {
  //   secondsLeft - 10      
  // })
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('incorrect')
}

//when game is finished, hide buttons, show scoreboard form
function finishGame() {
  console.log('Finished Game')
  directionsBox.classList.add('hide')
  scoreForm.classList.remove('hide')
}


//Define Questions
var questions = [
  {
    question: '1. Which is the right way to name a function?',
    answers: [
      { text: 'function myFunction()', correct: true },
      { text: 'function: myFunction()', correct: false },
      { text: 'function = myFunction()', correct: false },
      { text: 'function.myFunction()', correct: false }
    ]
  },
   {
    question: '2. Which of the following type of variable is visible only within a function where it is defined?',
    answers: [
      { text: 'global variable', correct: false },
      { text: 'boolean variable', correct: false },
      { text: 'local variable', correct: true },
      { text: 'none of the above', correct: false }
    ]
  },
  {
    question: '3. How would you declare an array',
    answers: [
      { text: 'var myArray (1, 2, 3)', correct: false },
      { text: 'var myArray = ["Apple", "Banana", "Cucumber"]', correct: true },
      { text: 'var myArray() {"blue", "green", "red"}', correct: false },
      { text: 'var myArray == 1', correct: false }
    ]
  }
]

//Timer
var timeText = document.querySelector("#time-left")
var secondsLeft = 180

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--
    timeText.textContent = secondsLeft;

    if(secondsLeft === 0) {
      questionBox.classList.add('hide')
      multipleChoice.classList.add('hide')
      timeText.textContent = 0
      clearInterval(timerInterval)
      finishGame()                                   //if time runs out, finish game
    } else if (secondsLeft <= 15) {                  //change color for warning
      timeText.style.color = 'red'
    }
  }, 1000)

  //if user finishes game, stop timer and collect score
  finishButton.addEventListener("click", function() {
    clearInterval(timerInterval)
    setScore()
  })

  // debug: does not decrease timer by ten
  // var incorrectAnswerClick = document.querySelector('.incorrect')
  // incorrectAnswerClick.addEventListener("click", function() {
  //   secondsLeft - 10
  // }) 
}


//debug this doesn't work - how do I get time left into score?
//Keep Score
var scoreCount

function setScore() {
  scoreHere.textContent = timeText
  localStorage.setItem("scoreCount", scoreHere)
}

function getScore() {
  
  var storedScore = localStorage.getItem("scoreCount")
  if (storedScore === null) {
    scoreCounter = 0
  } else {
    scoreCounter = storedScore
  }
  scoreHere.textContent = scoreCounter
}


//Highscore Board -- didn't have time to finish, this doesn't work
var scoreboardEl = document.querySelector('#score-board')

function saveHighScore(event) {
  event.preventDefault()
  var getInitials = document.querySelector('#initials').value
  if (!getInitials) {
    alert("Please enter your initials!")
  }
  scoreboardEl.append('<li>' + getInitials + '</li>')
  getInitials.textContent = ""
}

scoreboardEl.addEventListener("click", saveHighScore)








init()