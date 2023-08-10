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

import clickMouse from '../audio/clickMouse.mp3'
import countries from '../countries'
import { cardStyle } from '../styles'
import useSound from '../hooks/useSound'
import createQuiz from '../utils/createQuiz'
import { getQuizResult } from '../utils/asyncStorage'

const DashboardQuizes = () => {
  const { continent, label } = useLocalSearchParams() || {}
  const navigation = useNavigation()
  const playMouseClick = useSound(clickMouse)
  const insets = useSafeAreaInsets()
  const [resultsQuiz, setResultsQuiz] = useState({})
  const { 
    height: screenHeight,
    width: screenWidth, 
  } = useWindowDimensions()

  const countriesFilteredByContinent = countries
    .filter((country) => country.continents.includes(continent))
    .sort(() => Math.random() - 0.5)
  const quiz = createQuiz(countriesFilteredByContinent)

  useEffect(() => {
    const getAllQuizResults = async () => await Promise.all([
      getQuizResult(continent, 'countryNameQuiz'),
      getQuizResult(continent, 'flagQuiz'),
    ])

    getAllQuizResults()
      .then(([resultCountryNameQuiz, resultFlagQuiz]) => {
        setResultsQuiz({
          countryNameQuiz: resultCountryNameQuiz || {},
          flagQuiz: resultFlagQuiz || {}
        })
      })
  }, [])

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
        {label || continent}
      </Text>
      
      <Pressable
        onPress={() => navigation.navigate('CountryNameQuiz', { continent, quiz: JSON.stringify([quiz[0], quiz[1], quiz[2]]) })}
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
          <Text 
            style={{ 
              alignSelf: 'center',
              color: 'white',
              fontSize: 15, 
            }}
          >
            4 Countries {'\n'}
            Best: {resultsQuiz?.countryNameQuiz?.numCorrectSelections || 0}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('FlagQuiz', { continent, quiz: JSON.stringify([quiz[0], quiz[1], quiz[2]]) })}
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
          <Text 
            style={{ 
              alignSelf: 'center',
              color: 'white',
              fontSize: 15, 
            }}
          >
            4 Flags {'\n'} 
            Best: {resultsQuiz?.flagQuiz?.numCorrectSelections}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default DashboardQuizes