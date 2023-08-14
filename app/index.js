import { useNavigation } from 'expo-router'
import { 
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View, 
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux' 

import { getAllQuizResults } from '../api/resultsQuiz'
import clickMouse from '../audio/clickMouse.mp3'
import AfricaSvg from '../assets/africa.svg'
import AsiaSvg from '../assets/asia.svg'
import AustraliaSvg from '../assets/australia.svg' 
import EuropeSvg from '../assets/europe.svg'
import NorthAmerica from '../assets/northAmerica.svg'
import SouthAmerica from '../assets/southAmerica.svg'
import useSound from '../hooks/useSound'
import { setQuizResults } from '../reducers/resultsQuiz'
import { cardStyle } from '../styles'

const styleContinentCard = StyleSheet.create({
  ...cardStyle,
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
})

// const dispatchQuizResults = async (dispatch) => {
//   const allQuizResults = await getAllQuizResults()
//   dispatch(setQuizResults(allQuizResults))
// }

const App = () => {
  // dispatchQuizResults(useDispatch())
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { height: screenHeight } = useWindowDimensions()
  const playMouseClick = useSound(clickMouse)  
  
  return <View style={{ flex: 1, paddingTop: insets.top }}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Pressable
        android_ripple={{ borderless: false }}
        onPress={() => navigation.navigate('DashboardQuizes', { continent: 'Oceania', label: 'Australia and Oceania' })}
        onPressOut={playMouseClick}
        style={({ pressed }) => { 
          const style = { ...styleContinentCard, margin: screenHeight / 200 }
          if (pressed) style.opacity = 0.5
          return style
        }}
      >
        <AustraliaSvg
          height={screenHeight / 5}
          width='100%'
        />
      </Pressable>
      <Pressable 
        android_ripple={{ borderless: false }}
        onPress={() => navigation.navigate('DashboardQuizes', { continent: 'North America' })}
        onPressOut={playMouseClick}
        style={({ pressed }) => { 
          const style = { ...styleContinentCard, margin: screenHeight / 200 }
          if (pressed) style.opacity = 0.5
          return style
        }}
      >
        <NorthAmerica 
          height={screenHeight / 5}
          width='100%'
        />
      </Pressable>
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Pressable
        android_ripple={{ borderless: false }}
        onPress={() => navigation.navigate('DashboardQuizes', { continent: 'Africa' })}
        onPressOut={playMouseClick}
        style={({ pressed }) => { 
          const style = { ...styleContinentCard, margin: screenHeight / 200 }
          if (pressed) style.opacity = 0.5
          return style
        }}
      >
        <AfricaSvg
          height={screenHeight / 5}
          width='150%'
        />
      </Pressable>
      <Pressable 
        android_ripple={{ borderless: false }}
        onPress={() => navigation.navigate('DashboardQuizes', { continent: 'South America' })}
        onPressOut={playMouseClick}
        style={({ pressed }) => { 
          const style = { ...styleContinentCard, margin: screenHeight / 200 }
          if (pressed) style.opacity = 0.5
          return style
        }}
      >
        <SouthAmerica 
          height={screenHeight / 5}
          width='180%'
        />
      </Pressable>
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Pressable
        android_ripple={{ borderless: false }}
        onPress={() => navigation.navigate('DashboardQuizes', { continent: 'Asia' })}
        onPressOut={playMouseClick}
        style={({ pressed }) => { 
          const style = { ...styleContinentCard, margin: screenHeight / 200 }
          if (pressed) style.opacity = 0.5
          return style
        }}
      >
        <AsiaSvg
          height={screenHeight / 5}
          width='190%'
        />
      </Pressable>
      <Pressable 
        android_ripple={{ borderless: false }}
        onPress={() => navigation.navigate('DashboardQuizes', { continent: 'Europe' })}
        onPressOut={playMouseClick}
        style={({ pressed }) => { 
          const style = { ...styleContinentCard, margin: screenHeight / 200 }
          if (pressed) style.opacity = 0.5
          return style
        }}
      >
        <EuropeSvg 
          height={screenHeight / 5}
          width='130%'
        />
      </Pressable>
    </View>
  </View>
}

export default App
