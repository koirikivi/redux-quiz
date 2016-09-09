import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import * as actions from './actions';
import './App.css';
import './Quiz.css'

const ScoreBoard = ({ score }) => (
  <p><small><strong>score:</strong> {score}</small></p>
)

const Question = ({ question }) => (
  <div className="Quiz-question">
    <h2>{question.text}</h2>
    <ol className="Quiz-answers">
    {question.answers.map((answer, index) => (
      <Answer question={question} index={index} key={index} />
    ))}
    </ol>
  </div>
)

let Answer = ({ question, index, dispatch }) => {
  const answer = question.answers[index];

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
        onClick={() => actions.answerAndAdvance(dispatch, index)}>
      {answer}
    </li>
  )
}
Answer = connect()(Answer)

export let Quiz = ({ score, currentQuestion }) => (
  <div className="Quiz">
    <ScoreBoard score={score} />
    <Question question={currentQuestion} />
  </div>
)
Quiz = connect((state) => state)(Quiz)

export const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>React Quiz - Redux version!</h2>
    </div>
    <div className="App-main">
      <Quiz />
    </div>
  </div>
);
