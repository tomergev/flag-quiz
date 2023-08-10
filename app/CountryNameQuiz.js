import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { 
  FlatList,
  Image,
  Pressable,
  Text, 
  View, 
  useWindowDimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../styles'

import Hearts from '../components/Hearts'
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
              <FlatList
                data={quiz[currentIndex]?.choices}
                horizontal={false}  
                keyExtractor={c => c.name}
                numColumns={2}
                renderItem={({ item: choice }) => {
                  const choiceStyle = {}
                  const isChoiceSelected = choiceIdsSelected.includes(choice.id)
                  if (isChoiceSelected) {
                    const isChoiceAnswer = choice.id === quiz[currentIndex]?.answer?.id
                    choiceStyle.borderColor = isChoiceAnswer ? 'green' : 'red'
                    choiceStyle.borderWidth = 5
                  }

                  return (
                    <Pressable
                      disabled={choiceIdsSelected.includes(choice.id)}
                      onPress={() => {
                        setChoiceIdsSelected([...choiceIdsSelected, choice.id])

                        if (choice.id === quiz[currentIndex]?.answer?.id) {
                          setTimeout(() => {
                            setCurrentIndex(currentIndex + 1)
                            setChoiceIdsSelected([])
                          }, 400)
                        } else {
                          setNumOfIncorrectSelections(numOfIncorrectSelections + 1)
                        }
                      }}
                      style={{ 
                        ...choiceStyle,
                        flex: 1, 
                        justifyContent: 'center',
                        height: screenHeight / 3.15,
                        margin: screenHeight / 350,
                        ...styles.shadow
                      }}
                    >
                      <Text 
                        style={{
                          alignSelf: 'center',
                          fontSize: 20,
                        }}
                      >
                        {choice.name}
                      </Text>
                    </Pressable>
                  )
                }}                         
              />
            </View>
          </>
        )
      }
    </View>
  )
}

export default CountryNameQuiz