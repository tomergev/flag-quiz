import AsyncStorage from '@react-native-async-storage/async-storage'

export const getQuizResult = async (continent, quizType) => {
  const key = `${continent}-${quizType}`
  return JSON.parse(
    await AsyncStorage.getItem(key)
  )
}

export const storeQuizResult = async (continent, quizType, numCorrectSelections, numIncorrectSelections) => {
  const key = `${continent}-${quizType}`
  const quizResultBest = JSON.parse(
    await AsyncStorage.getItem(key) 
  )
  
  if (quizResultBest === null || numCorrectSelections >= quizResultBest.numCorrectSelections) {
    await AsyncStorage.setItem(key, JSON.stringify({
      numCorrectSelections,
      numIncorrectSelections,
      timestamp: new Date().toISOString(),
    }))
  }
}