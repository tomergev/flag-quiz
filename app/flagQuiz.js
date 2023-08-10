import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
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

const FlagQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [choiceIdsSelected, setChoiceIdsSelected] = useState([])
  const [numOfIncorrectSelections, setNumOfIncorrectSelections] = useState(0)
  const insets = useSafeAreaInsets()
  const { height: screenHeight } = useWindowDimensions()
  const params = useLocalSearchParams() || {}
  const quiz = JSON.parse(params.quiz || []) 
  const isQuizDone = numOfIncorrectSelections >= 3 || quiz[currentIndex] === undefined

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      {
        isQuizDone ? <ResultQuiz numCorrectAnswers={currentIndex} /> : (
          <>
            <View style={{ flex: 2 }}>
              <Hearts numOfIncorrectSelections={numOfIncorrectSelections} />
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
                  numOfIncorrectSelections={numOfIncorrectSelections}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  setNumOfIncorrectSelections={setNumOfIncorrectSelections}
                />
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[1]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  numOfIncorrectSelections={numOfIncorrectSelections}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  setNumOfIncorrectSelections={setNumOfIncorrectSelections}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[2]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  numOfIncorrectSelections={numOfIncorrectSelections}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  setNumOfIncorrectSelections={setNumOfIncorrectSelections}
                />
                <OptionFlag 
                  answer={quiz[currentIndex]?.answer}
                  choice={quiz[currentIndex]?.choices[3]}
                  choiceIdsSelected={choiceIdsSelected}
                  currentIndex={currentIndex}
                  numOfIncorrectSelections={numOfIncorrectSelections}
                  screenHeight={screenHeight}
                  setChoiceIdsSelected={setChoiceIdsSelected}
                  setCurrentIndex={setCurrentIndex}
                  setNumOfIncorrectSelections={setNumOfIncorrectSelections}
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