import { pickRandomQuestion } from './questions'

export const SET_QUESTION = 'SET_QUESTION'
export const setQuestion = (question) => ({
  type: SET_QUESTION,
  question
})


// action creator for picking a random question
export const nextQuestion = () => setQuestion(pickRandomQuestion())

export const ANSWER = 'ANSWER'
export const answer = (answerIndex) => ({
  type: ANSWER,
  answerIndex
})

// action creator for answering and advaning to next stage
export const answerAndAdvance = (dispatch, answerIndex) => {
  console.log("answerAndAdvance")
  dispatch(answer(answerIndex))
  setTimeout(() => dispatch(nextQuestion()), 1500)
}
