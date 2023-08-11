import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { 
  Image,
  View, 
  useWindowDimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Hearts from '../components/Hearts'
import OptionFlag from '../components/OptionCountryName'
import ProgressBar from '../components/ProgressBar'
import ResultQuiz from '../components/ResultQuiz' 
import { storeQuizResult } from '../api/resultsQuiz'

const CountryNameQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [choiceIdsSelected, setChoiceIdsSelected] = useState([])
  const [numIncorrectSelections, setNumIncorrectSelections] = useState(0)
  const insets = useSafeAreaInsets()
  const { height: screenHeight } = useWindowDimensions()
  const params = useLocalSearchParams() || {}
  const quiz = JSON.parse(params.quiz || []) 
  const isQuizDone = numIncorrectSelections >= 3 || quiz[currentIndex] === undefined

  if (isQuizDone) {
    storeQuizResult(params.continent, 'countryNameQuiz', currentIndex, numIncorrectSelections)
  }

  const updatenumIncorrectSelections = () => {
    if (numIncorrectSelections === 2) {
      setTimeout(() => setNumIncorrectSelections(3), 1200)
    } else {
      setNumIncorrectSelections(numIncorrectSelections + 1)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        paddingTop: insets.top,
      }}
    >
      {
        isQuizDone ? <ResultQuiz numCorrectSelections={currentIndex} /> : (
          <>
            <View 
              style={{ 
                flex: 2, 
                justifyContent: 'center',
              }}
            >
              <Hearts numIncorrectSelections={numIncorrectSelections} />
              <Image             
                resizeMode='center'
                source={{ uri: quiz[currentIndex]?.answer?.flag }} 
                style={{ flex: 1 }}
              />
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
                  updatenumIncorrectSelections={updatenumIncorrectSelections}
                />
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[1]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  updatenumIncorrectSelections={updatenumIncorrectSelections}
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
                  updatenumIncorrectSelections={updatenumIncorrectSelections}
                />
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[3]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  updatenumIncorrectSelections={updatenumIncorrectSelections}
                />
              </View>
            </View>
          </>
        )
      }
    </View>
  )
}

export default CountryNameQuiz