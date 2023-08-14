import {
  useEffect,
  useState,
} from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'

import { getAllQuizResults } from '../api/resultsQuiz'
import AfricaSvg from '../assets/africa.svg'
import AsiaSvg from '../assets/asia.svg'
import AustraliaSvg from '../assets/australia.svg' 
import EuropeSvg from '../assets/europe.svg'
import NorthAmericaSvg from '../assets/northAmerica.svg'
import SouthAmericaSvg from '../assets/southAmerica.svg'
import OptionGroup from '../components/OptionGroup'
import groupBy from '../utils/groupBy'

const App = () => {
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets()
  const [resultsQuiz, setResultsQuiz] = useState([])
  
  useEffect(() => {
    const updateAllQuizResults = async () => {
      const allQuizResults = await getAllQuizResults() || []
      setResultsQuiz(allQuizResults)
    }
    if (isFocused) updateAllQuizResults()
  }, [isFocused])
  const resultsQuizGroupedByGroup = groupBy(resultsQuiz, 'group')
  
  return <View style={{ flex: 1, paddingTop: insets.top }}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <OptionGroup
        continent='Oceania'
        label='Australia and Oceania'
        resultsQuiz={resultsQuizGroupedByGroup['Oceania'] || []}
        Svg={AustraliaSvg}
      />
      <OptionGroup
        continent='North America'
        resultsQuiz={resultsQuizGroupedByGroup['North America'] || []}
        Svg={NorthAmericaSvg}
      />
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <OptionGroup
        continent='Africa'
        resultsQuiz={resultsQuizGroupedByGroup['Africa'] || []}
        Svg={AfricaSvg}
        SvgWidth='150%'
      />
      <OptionGroup
        continent='South America'
        resultsQuiz={resultsQuizGroupedByGroup['South America'] || []}
        Svg={SouthAmericaSvg}
        SvgWidth='180%'
      />
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <OptionGroup
        continent='Asia'
        resultsQuiz={resultsQuizGroupedByGroup['Asia'] || []}
        Svg={AsiaSvg}
        SvgWidth='190%'
      />
      <OptionGroup
        continent='Europe'
        resultsQuiz={resultsQuizGroupedByGroup['Europe'] || []}
        Svg={EuropeSvg}
        SvgWidth='130%'
      />
    </View>
  </View>
}

export default App
