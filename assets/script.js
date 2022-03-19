//Game Functions

//clicking Start
// var startButton = document.getElementById('start-button')
var startButton = document.querySelector('#start-button')
var finishButton = document.querySelector('#finish-button')
var questionBox = document.querySelector('#question')
var directionsBox = document.querySelector('#direction-buttons')
var prevButton = document.querySelector('#prevButton')
var nextButton = document.querySelector('#nextButton')
var multipleChoice = document.querySelector('#multichoice')
var scoreForm = document.querySelector('#score-form')
var currentQuestion
var firstQuestion

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

function resetQuiz() {
  prevButton.classList.add('hide')
  if (currentQuestion.length == firstQuestion + 1) {
    prevButton.classList.remove('hide')
  }
  nextButton.classList.add('hide')
  while (multipleChoice.firstChild) {
    multipleChoice.removeChild(multipleChoice.firstChild)
  }
}

function userAnswer(e) {
  var clickedAnswer = e.target
  var correct = clickedAnswer.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(multipleChoice.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (currentQuestion.length > firstQuestion + 1) {
    nextButton.classList.remove('hide')
  }
  else {
    finishButton.classList.remove('hide')
    prevButton.classList.add('hide')
    questionBox.classList.add('hide')
    multipleChoice.classList.add('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  }
}

function clearStatusClass(element) {
  element.classList.add('correct')
  element.classList.add('incorrect')
}

function finishGame() {
  console.log('Finished Game')
  directionsBox.classList.add('hide')
  scoreForm.classList.remove('hide')
}


//what are the questions?
//Questions altered from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS

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
    question: '2. What sound does a cow make',
    answers: [
      { text: 'moo', correct: true },
      { text: 'quack', correct: false },
      { text: 'meow', correct: false },
      { text: 'bark', correct: false }
    ]
  }
]

console.log(questions)







//Start Timer




//Keep Score