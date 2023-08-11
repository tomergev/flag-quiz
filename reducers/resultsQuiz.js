import { createSelector, createSlice } from '@reduxjs/toolkit'

export const resultsQuizSlice = createSlice({
  name: 'resultsQuiz',
  initialState: [],
  reducers: { 
    setQuizResults(_state, { payload }) {
      return payload
    },
    updateQuizResults(state, payload) {
      const index = state?.resultsQuiz?.findIndex((resultQuiz) => resultQuiz.id === payload.id)
      state.resultsQuiz[index] = payload
      return state?.resultsQuiz
    },
  },
})

export const { setQuizResults, updateQuizResults } = resultsQuizSlice.actions

export const makeQuizResultSelectorByContinent = () => {
  return createSelector(
    [(state) => state.resultsQuiz, (_state, continent) => continent],
    (resultsQuiz, continent) => {
      const resultCountryNameQuiz = resultsQuiz.find(({ id }) => id === `${continent}-countryNameQuiz`)
      const resultFlagQuiz = resultsQuiz.find(({ id }) => id === `${continent}-flagQuiz`)
      return { resultCountryNameQuiz, resultFlagQuiz }
    }
  )
}

export default resultsQuizSlice.reducer