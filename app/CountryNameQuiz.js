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

const CountryNameQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [choiceIdsSelected, setChoiceIdsSelected] = useState([])
  const [numOfIncorrectSelections, setNumOfIncorrectSelections] = useState(0)
  const insets = useSafeAreaInsets()
  const { height: screenHeight } = useWindowDimensions()
  const params = useLocalSearchParams() || {}
  const quiz = JSON.parse(params.quiz || []) 
  const isQuizDone = numOfIncorrectSelections >= 3 || quiz[currentIndex] === undefined

  const updateNumOfIncorrectSelections = () => {
    if (numOfIncorrectSelections === 2) {
      setTimeout(() => setNumOfIncorrectSelections(3), 1200)
    } else {
      setNumOfIncorrectSelections(numOfIncorrectSelections + 1)
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
        isQuizDone ? <ResultQuiz numCorrectAnswers={currentIndex} /> : (
          <>
            <View 
              style={{ 
                flex: 2, 
                justifyContent: 'center',
              }}
            >
              <Hearts numOfIncorrectSelections={numOfIncorrectSelections} />
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
                  updateNumOfIncorrectSelections={updateNumOfIncorrectSelections}
                />
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[1]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  updateNumOfIncorrectSelections={updateNumOfIncorrectSelections}
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
                  updateNumOfIncorrectSelections={updateNumOfIncorrectSelections}
                />
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[3]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  updateNumOfIncorrectSelections={updateNumOfIncorrectSelections}
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