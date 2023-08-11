import AsyncStorage from '@react-native-async-storage/async-storage'

const QUIZ_KEYS = [
  'Africa-flagQuiz',
  'Africa-countryNameQuiz',
  'Asia-flagQuiz',
  'Asia-countryNameQuiz',
  'Europe-flagQuiz',
  'Europe-countryNameQuiz',
  'North America-flagQuiz',
  'North America-countryNameQuiz',
  'Oceania-flagQuiz',
  'Oceania-countryNameQuiz',
  'South America-flagQuiz',
  'South America-countryNameQuiz',
]

export const getAllQuizResults = async () => {
  const res = await AsyncStorage.multiGet(QUIZ_KEYS)
  const allResultsQuiz = res.map(([key, resultQuiz]) => ({
    id: key,
    ...JSON.parse(resultQuiz || '{}'),
  }))
  return allResultsQuiz  
}

export const storeQuizResult = async (group, quizType, numCorrectSelections, numIncorrectSelections) => {
  const key = `${group}-${quizType}`
  const quizResultBest = JSON.parse(
    await AsyncStorage.getItem(key) 
  )
  
  if (quizResultBest === null || numCorrectSelections >= quizResultBest.numCorrectSelections) {
    await AsyncStorage.setItem(key, JSON.stringify({
      id: key,
      group,
      numCorrectSelections,
      numIncorrectSelections,
      timestamp: new Date().toISOString(),
    }))
  }
}