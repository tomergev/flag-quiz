import { 
  Image,
  Pressable,
} from 'react-native'

import { cardStyle } from '../styles'
import jingleCorrect from '../audio/jingleCorrect.mp3'
import jingleIncorrect from '../audio/jingleIncorrect.mp3'
import useSound from '../hooks/useSound'

const OptionFlag = ({ 
  answer,
  choice,
  choiceIdsSelected,
  currentIndex,
  screenHeight,
  setChoiceIdsSelected,
  setCurrentIndex,
  updateNumIncorrectSelections,
}) => {
  const playCorrectJingle = useSound(jingleCorrect)
  const playIncorrectJingle = useSound(jingleIncorrect)
  
  const createStyle = ({ pressed }) => {
    const style = { 
      ...cardStyle,
      flex: 1, 
      margin: screenHeight / 200,
    }
    
    const isChoiceSelected = choiceIdsSelected.includes(choice?.id)
    if (isChoiceSelected) {
      const isChoiceAnswer = choice?.id === answer?.id
      style.backgroundColor = isChoiceAnswer ? '#42f548' : 'red'
      style.opacity = 0.75
    }

    if (pressed) style.opacity = 0.5

    return style
  }
  const onPress = () => {
    setChoiceIdsSelected([...choiceIdsSelected, choice?.id])

    if (choice?.id === answer?.id) {
      playCorrectJingle()
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setChoiceIdsSelected([])
      }, 1200)
    } else {
      playIncorrectJingle()
      updateNumIncorrectSelections()
    }
  }

  return (
    <Pressable
      android_ripple={{ borderless: false }}
      disabled={choiceIdsSelected.includes(choice?.id)}
      onPress={onPress}
      style={createStyle}
    >
      <Image             
        resizeMode='contain'
        source={{ uri: choice?.flag }} 
        style={{ flex: 1 }}
      />
    </Pressable>
  )
}

export default OptionFlag