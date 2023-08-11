import { createSlice } from '@reduxjs/toolkit'

export const resultsQuizSlice = createSlice({
  name: 'resultsQuiz',
  initialState: [],
  reducers: { 
    setQuizResults(state, { payload }) {
      return payload
      // console.log('state, payload', state, payload)
      // state.resultsQuiz = payload
      // console.log(state.resultsQuiz)
      // return state.resultsQuiz
    },
    updateQuizResults(state, payload) {
      const index = state?.resultsQuiz?.findIndex((resultQuiz) => resultQuiz.id === payload.id)
      state.resultsQuiz[index] = payload
      return state?.resultsQuiz
    },
  },
})

export const { setQuizResults, updateQuizResults } = resultsQuizSlice.actions

export default resultsQuizSlice.reducer