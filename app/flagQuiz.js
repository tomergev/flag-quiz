import { useLocalSearchParams } from 'expo-router'
import { 
  useEffect,
  useState, 
} from 'react'
import { 
  Text, 
  useWindowDimensions,
  View, 
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Hearts from '../components/Hearts'
import OptionFlag from '../components/OptionFlag'
import ProgressBar from '../components/ProgressBar'
import ResultQuiz from '../components/ResultQuiz' 
import { 
  getQuizResult, 
  storeQuizResult, 
} from '../api/resultsQuiz'

const FlagQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [choiceIdsSelected, setChoiceIdsSelected] = useState([])
  const [numCorrectSelections, setNumCorrectSelections] = useState(0)
  const [numIncorrectSelections, setNumIncorrectSelections] = useState(0)
  const [resultQuiz, setResultQuiz] = useState({})
  const insets = useSafeAreaInsets()
  const { height: screenHeight } = useWindowDimensions()
  const params = useLocalSearchParams() || {}
  const { continent } = params
  const quiz = JSON.parse(params.quiz || []) 
  const isQuizDone = numIncorrectSelections >= 3 || quiz[currentIndex] === undefined

  useEffect(() => {
    const updateResultQuiz = async () => {
      const resultQuiz = await getQuizResult(`${continent}-flagQuiz`)
      setResultQuiz(resultQuiz || {})
    }
    updateResultQuiz()
  }, [])

  const updateNumIncorrectSelections = () => {
    if (numIncorrectSelections === 2) {
      setTimeout(() => setNumIncorrectSelections(3), 1000)
    } else {
      setNumIncorrectSelections(numIncorrectSelections + 1)
    }
  }

  if (isQuizDone) {
    storeQuizResult(params.continent, 'flagQuiz', numCorrectSelections, numIncorrectSelections, quiz.length)
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      {
        isQuizDone ? <ResultQuiz numCorrectSelections={numCorrectSelections} resultQuiz={resultQuiz} /> : (
          <>
            <View style={{ flex: 2 }}>
              <Hearts numIncorrectSelections={numIncorrectSelections} />
              <View 
                style={{ 
                  flex: 1, 
                  justifyContent: 'center',
                }}
              >
                <Text 
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 20,
                  }}
                >
                  {quiz[currentIndex]?.answer?.name}
                </Text>
              </View>
              <ProgressBar progress={currentIndex / quiz.length} />
            </View>
            <View style={{ flex: 4 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[0]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  setNumCorrectSelections={setNumCorrectSelections}
                  updateNumIncorrectSelections={updateNumIncorrectSelections}
                />
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[1]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  setNumCorrectSelections={setNumCorrectSelections}
                  updateNumIncorrectSelections={updateNumIncorrectSelections}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[2]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  setNumCorrectSelections={setNumCorrectSelections}
                  updateNumIncorrectSelections={updateNumIncorrectSelections}
                />
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[3]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  setNumCorrectSelections={setNumCorrectSelections}
                  updateNumIncorrectSelections={updateNumIncorrectSelections}
                />
              </View>
            </View>
          </>
        )
      }
    </View>
  )
}

export default FlagQuiz