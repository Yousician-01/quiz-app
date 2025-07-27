
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click',startGame)

nextButton.addEventListener('click',() =>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    quizScore=0

}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText= question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct =answer.correct
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

    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button,button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide")
    }else{
        startButton.innerText ="restart"
        startButton.classList.remove("hide")
    }
    if (selectedButton.dataset = correct) {
        quizScore++
    }
    document.getElementById('right-answers').innerText=quizScore
}

function setStatusClass(element,correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add("correct")
    }else{
        element.classList.add("wrong")
    } 
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question : "What is the capital of India?",
        answers : [
            {text: "New Delhi", correct: true},
            {text: "Mumbai", correct: false},
            {text: "Bangalore", correct: false},
            {text: "Chennai", correct: false}
        ]
    },

    {
        question : "Who are you?",
        answers : [
            {text: "Not Not Me", correct: false},
            {text: "Me", correct: false},
            {text: "Not Not You", correct: true},
            {text: "I don't know", correct: false}
        ]
    },

    {
        question : "Whis is the language used to devlop this quiz?",
        answers : [
            {text: "R", correct: false},
            {text: "C++", correct: false},
            {text: "Python", correct: false},
            {text: "HTML", correct: true}
        ]
    },

    {
        question : "What language is pro-dominantly used for AI devlopment?",
        answers : [
            {text: "Java", correct: false},
            {text: "Python", correct: true},
            {text: "Java Script", correct: false},
            {text: "Kotlin", correct: false}
        ]
    },

    {
        question : "Which one of this is not an actual Operating System?",
        answers : [
            {text: "Ubuntu", correct: false},
            {text: "Macintosh", correct: false},
            {text: "Windows", correct: false},
            {text: "Linux", correct: true}
        ]
    }
]