import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { App } from './components';
import { quizApp } from './reducers'
import { pickRandomQuestion } from './questions';
import './index.css';

let store = createStore(
  quizApp,
  {
    score: 0,
    currentQuestion: pickRandomQuestion(),
    answerBlocked: false,
  },
  window.devToolsExtension && window.devToolsExtension()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,

  document.getElementById('root')
);
