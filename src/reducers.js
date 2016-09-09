import { SET_QUESTION, ANSWER } from './actions'

export const quizApp = (state, action) => {
  switch(action.type) {
    case SET_QUESTION:
      return {
        ...state,
        currentQuestion: action.question
      }
    case ANSWER:
      if(state.currentQuestion.selectedAnswer !== undefined)
        return state;

      const correctAnswer = state.currentQuestion.correctAnswer;

      return {
        ...state,
        score: action.answerIndex === correctAnswer ? state.score + 1 : state.score,
        currentQuestion: {
          ...state.currentQuestion,
          selectedAnswer: action.answerIndex,
        }
      }
    default:
      return state;
  }

}
