import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { 
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View, 
} from 'react-native'

import clickMouse from '../audio/clickMouse.mp3'
import useSound from '../hooks/useSound'
import { cardStyle } from '../styles'

const styleContinentCard = StyleSheet.create({
  ...cardStyle,
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
})

const determineNumOfQuizesCompleted = (resultsQuiz) => (
  resultsQuiz
    .filter(({ isAllQuestionsAnswered }) => isAllQuestionsAnswered) 
    .length
)

const OptionGroup = ({
  continent,
  label,
  resultsQuiz,
  Svg,
  SvgWidth,
}) => {
  const navigation = useNavigation()
  const { 
    height: screenHeight,
    width: screenWidth, 
  } = useWindowDimensions()
  const playMouseClick = useSound(clickMouse)  

  return (
    <Pressable
      android_ripple={{ borderless: false }}
      onPress={() => navigation.navigate('DashboardQuizes', { continent, label })}
      onPressOut={playMouseClick}
      style={({ pressed }) => { 
        const style = { ...styleContinentCard, margin: screenHeight / 200 }
        if (pressed) style.opacity = 0.5
        return style
      }}
    >
      <Svg
        height={screenHeight / 5}
        width={SvgWidth || '100%'}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text 
          style={{ 
            alignSelf: 'center', 
            color: 'white', 
            fontSize: 15, 
            marginRight: screenWidth / 50,
          }}
        >
          {determineNumOfQuizesCompleted(resultsQuiz)} / {resultsQuiz.length}
        </Text>
        <AntDesign 
          color='yellow' 
          name={determineNumOfQuizesCompleted(resultsQuiz) === resultsQuiz.length ? 'star' : 'staro'}
          size={24} 
        />
      </View>
    </Pressable>
  )
}

export default OptionGroup