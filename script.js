const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const container = document.getElementById('container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    container.removeAttribute('class')
    container.setAttribute('class', 'neutral')
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() -.5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion () {
    resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
          button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
  })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct) {
    container.removeAttribute('class')
    container.setAttribute('class', 'green')
  } else {
      container.removeAttribute('class')
      container.setAttribute('class', 'red')
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
  }
  
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Is JavaScript the same as Java?',
        answers: [
            {text: 'yes', correct: false},
            {text: 'no', correct: true}
        ]
    },
    {
        question: 'is space around similar to space between?',
        answers: [
            {text: 'no', correct: false},
            {text: 'yes', correct: true}
        ]
    },
    {
        question: 'what does media query allow you to do?',
        answers: [
            {text: 'check the videos and web content', correct: false},
            {text: 'allows you to apply certain CSS rules when a condition is met', correct: true},
            {text: 'allows you to apply CSS to everything inside of a div', correct: false}
        ]
    },
]