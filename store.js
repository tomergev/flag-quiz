import { configureStore } from '@reduxjs/toolkit'
import resultsQuizReducer from './reducers/resultsQuiz'

export const store = configureStore({
  reducer: {
    resultsQuiz: resultsQuizReducer,
  },
})