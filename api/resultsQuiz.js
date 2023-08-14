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
const KEYS_GROUP_MAP = {
  'Africa-flagQuiz': 'Africa',
  'Africa-countryNameQuiz': 'Africa',
  'Asia-flagQuiz': 'Asia',
  'Asia-countryNameQuiz': 'Asia',
  'Europe-flagQuiz': 'Europe',
  'Europe-countryNameQuiz': 'Europe',
  'North America-flagQuiz': 'North America',
  'North America-countryNameQuiz': 'North America',
  'Oceania-flagQuiz': 'Oceania',
  'Oceania-countryNameQuiz': 'Oceania',
  'South America-flagQuiz': 'South America',
  'South America-countryNameQuiz': 'South America',
}

export const getAllQuizResults = async () => {
  const res = await AsyncStorage.multiGet(QUIZ_KEYS)
  const allResultsQuiz = res.map(([key, resultQuiz]) => ({
    id: key,
    group: KEYS_GROUP_MAP[key],
    ...JSON.parse(resultQuiz || '{}'),
  }))
  return allResultsQuiz  
}

export const getContinentQuizResults = async (continent) => {
  const res = await AsyncStorage.multiGet([
    `${continent}-countryNameQuiz`,
    `${continent}-flagQuiz`,
  ])
  const resultsQuizContinent = res.map(([key, resultQuiz]) => ({
    id: key,
    ...JSON.parse(resultQuiz || '{}'),
  }))
  return resultsQuizContinent  
}

export const removeAll = () => AsyncStorage.multiRemove(QUIZ_KEYS)

export const storeQuizResult = async (continent, quizType, numCorrectSelections, numIncorrectSelections, numTotalQuestions) => {
  const key = `${continent}-${quizType}`
  const quizResultBest = JSON.parse(
    await AsyncStorage.getItem(key) 
  )
  
  if (quizResultBest === null || numCorrectSelections >= quizResultBest.numCorrectSelections) {
    const resultQuiz = {
      group: continent,
      id: key,
      isAllQuestionsAnswered: numCorrectSelections === numTotalQuestions,
      numCorrectSelections,
      numIncorrectSelections,
      numTotalQuestions,
      timestamp: new Date().toISOString(),
      quizType,
    }
    await AsyncStorage.setItem(key, JSON.stringify(resultQuiz))
    return resultQuiz
  }
}