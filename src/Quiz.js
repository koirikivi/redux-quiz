import React, { Component } from 'react';
import Random from 'random-js'
import './Quiz.css'

const random = Random()

const exampleState = {
  score: 0,
  currentQuestion: {
    text: "Foo?",
    answers: [
      "Foo",
      "Bar",
      "Baz",
    ],
    correctAnswer: 0,
    selectedAnswer: undefined,
  }
}

const createQuestion = (text, answers, correctAnswer = 0) => ({
  text,
  answers,
  correctAnswer,
  selectedAnswer: undefined,
})

const allQuestions = [
  createQuestion("Kuka on Suomen presidentti",
    ["Sauli Niinistö", "Ville Valo", "Kimmo Heikkilä", "Antti Pelkonen"]),
  createQuestion("What's your mother's maiden name?",
    ["Iron Maiden", "Esa", "Pasi", "Jorma"]),
  createQuestion("Mikä on Kirkasta ja haisee pahalta?",
    ["Koskenkorva", "Jaloviina", "Olut", "Ei mikään näistä"]),
  createQuestion("\"Kun Mustanaamio liikkuu, on salamakin hidas kuin ____.\"",
    ["etana", "gaselli", "kilpikonna", "Norton Antivirus"]),
  createQuestion("\"Mustanaamiolla on kymmenen ____ voimat.\"",
    ["tiikerin", "koiran", "leijonan", "karhun"]),
]


const pickRandomQuestion = () => {
  const question = random.pick(allQuestions);
  const correctAnswerStr = question.answers[question.correctAnswer];
  let answers = question.answers.slice();
  random.shuffle(answers);
  return {
    ...question,
    answers,
    correctAnswer: answers.indexOf(correctAnswerStr),
  }
}


const ScoreBoard = ({ score }) => {
  return <p><small><strong>score:</strong> {score}</small></p>
}

const Question = ({ question, answerCallback }) => {
  return (
    <div className="Quiz-question">
      <h2>{question.text}</h2>
      <ol className="Quiz-answers">
      {question.answers.map((answer, index) => {
        let classNames = "Quiz-answer"
        if(question.selectedAnswer === index) {
          classNames += " selected"

          if(question.correctAnswer !== question.selectedAnswer) {
            classNames += " wrong"
          }
        }
        if(typeof question.selectedAnswer !== "undefined") {
          if(question.correctAnswer === index) {
            classNames += " correct"
          }
        }

        return (
          <li className={classNames} key={index}
              onClick={() => answerCallback(index)}>
            {answer}
          </li>
        )
      })}
      </ol>
    </div>
  )
}

export class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      currentQuestion: pickRandomQuestion(),
    }
    this.blockUpdates = false

    this.answer = this.answer.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
  }
  answer(answerIndex) {
    if(this.blockUpdates)
      return

    this.blockUpdates = true
    this.setState(
      {...this.state, currentQuestion: {
        ...this.state.currentQuestion, selectedAnswer: answerIndex
      }}
    )
    setTimeout(() => {
      if(this.state.currentQuestion.correctAnswer === answerIndex) {
        this.setState(
          {...this.state, score: this.state.score + 1}
        )
      }

      this.nextQuestion()
      this.blockUpdates = false
    }, 1500)
  }
  nextQuestion() {
    this.setState(
      {...this.state, currentQuestion: pickRandomQuestion()}
    )
  }
  render() {
    return (
      <div className="Quiz">
        <ScoreBoard score={this.state.score} />
        <Question question={this.state.currentQuestion}
                  answerCallback={this.answer}/>
      </div>
    )
  }
}
