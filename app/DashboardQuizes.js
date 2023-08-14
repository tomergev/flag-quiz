import { AntDesign } from '@expo/vector-icons'
import { 
  useLocalSearchParams, 
  useNavigation,
} from 'expo-router'
import { 
  useEffect, 
  useState, 
} from 'react'
import { 
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View, 
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'

import { getContinentQuizResults } from '../api/resultsQuiz'
import clickMouse from '../audio/clickMouse.mp3'
import countries from '../countries'
import useSound from '../hooks/useSound'
import { cardStyle } from '../styles'
import createQuiz from '../utils/createQuiz'

const DashboardQuizes = () => {
  const isFocused = useIsFocused()
  const { continent, label } = useLocalSearchParams() || {}
  const navigation = useNavigation()
  const playMouseClick = useSound(clickMouse)
  const [resultsQuiz, setResultsQuiz] = useState({})
  const insets = useSafeAreaInsets()
  const { 
    height: screenHeight,
    width: screenWidth, 
  } = useWindowDimensions()

  useEffect(() => {
    const updateResultsQuiz = async () => {
      const continentQuizResults = await getContinentQuizResults(continent)
      const countryName = continentQuizResults.find(({ id }) => id === `${continent}-countryNameQuiz`)
      const flag = continentQuizResults.find(({ id }) => id === `${continent}-flagQuiz`)
      setResultsQuiz({ countryName, flag })
    }
    if (isFocused) updateResultsQuiz()
  }, [isFocused])

  const countriesFilteredByContinent = countries
    .filter((country) => country.continents.includes(continent))
    .sort(() => Math.random() - 0.5) // Randomizing the order of countries. Inefficient, but does the job
  const quiz = createQuiz(countriesFilteredByContinent)

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
        {label || continent}
      </Text>
      
      <Pressable
        onPress={() => navigation.navigate('CountryNameQuiz', { continent, quiz: JSON.stringify(quiz) })}
        onPressOut={playMouseClick}
        style={{ 
          ...cardStyle,
          flexDirection: 'row', 
          height: screenHeight / 10,
          margin: screenHeight / 100,
        }}
      >
        <Image             
          resizeMode='contain'
          source={{ uri: countriesFilteredByContinent[0]?.flags?.png }} 
          style={{ 
            height: '100%',
            width: screenWidth / 5,
          }}
        />
        <View 
          style={{ 
            flex: 1, 
            justifyContent: 'center',
          }}
        >
          <View style={{ alignSelf: 'center' }}> 
            <Text 
              style={{ 
                color: 'white',
                fontSize: 15, 
              }}
            >
              4 Countries
            </Text>
            <Text 
              style={{ 
                alignSelf: 'center', 
                color: 'white',
                fontSize: 12, 
              }}
            >
              Best: {resultsQuiz?.countryName?.numCorrectSelections || 0}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <AntDesign 
            color='yellow' 
            name={(resultsQuiz?.countryName?.numCorrectSelections / quiz.length) === 1 ? 'star' : 'staro'} 
            size={24} 
            style={{ marginRight: screenWidth / 100 }}
          />
        </View>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('FlagQuiz', { continent, quiz: JSON.stringify(quiz) })}
        onPressOut={playMouseClick}
        style={{ 
          ...cardStyle,
          flexDirection: 'row', 
          height: screenHeight / 10,
          margin: screenHeight / 100,
        }}
      >
        <View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image             
              resizeMode='contain'
              source={{ uri: countriesFilteredByContinent[1]?.flags?.png }} 
              style={{ 
                height: '100%',
                marginRight: screenWidth / 100,
                width: screenWidth / 10,
              }}
            />
            <Image             
              resizeMode='contain'
              source={{ uri: countriesFilteredByContinent[2]?.flags?.png }} 
              style={{ 
                height: '100%',
                width: screenWidth / 10,
              }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image             
              resizeMode='contain'
              source={{ uri: countriesFilteredByContinent[3]?.flags?.png }} 
              style={{ 
                height: '100%',
                marginRight: screenWidth / 100,
                width: screenWidth / 10,
              }}
            />
            <Image             
              resizeMode='contain'
              source={{ uri: countriesFilteredByContinent[4]?.flags?.png }} 
              style={{ 
                height: '100%',
                width: screenWidth / 10,
              }}
            />
          </View>
        </View>
        <View 
          style={{ 
            flex: 1, 
            justifyContent: 'center',
          }}
        >
          <View style={{ alignSelf: 'center' }}> 
            <Text 
              style={{ 
                color: 'white',
                fontSize: 15, 
              }}
            >
              4 Flags
            </Text>
            <Text 
              style={{ 
                alignSelf: 'center', 
                color: 'white',
                fontSize: 12, 
              }}
            >
              Best: {resultsQuiz?.flag?.numCorrectSelections || 0}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <AntDesign 
            color='yellow' 
            name={(resultsQuiz?.flag?.numCorrectSelections / quiz.length) === 1 ? 'star' : 'staro'} 
            size={24} 
            style={{ marginRight: screenWidth / 100 }}
          />
        </View>
      </Pressable>
    </View>
  )
}

export default DashboardQuizes