import { useNavigation } from 'expo-router'
import { 
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View, 
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AfricaSvg from '../assets/africa.svg'
import AsiaSvg from '../assets/asia.svg'
import AustraliaSvg from '../assets/australia.svg' 
import EuropeSvg from '../assets/europe.svg'
import NorthAmerica from '../assets/northAmerica.svg'
import SouthAmerica from '../assets/southAmerica.svg'

const styles = StyleSheet.create({
  continent: {
    alignItems: 'center',
    backgroundColor: '#495057',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  }
})

const App = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { height: screenHeight } = useWindowDimensions()

  return <View style={{ flex: 1, paddingTop: insets.top }}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Pressable
        android_ripple={{ borderless: false }}
        onPress={() => navigation.navigate('DashboardQuizes', { continent: 'Oceania', label: 'Australia and Oceania' })}
        style={({ pressed }) => { 
          const style = { ...styles.continent, margin: screenHeight / 200 }
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
        style={({ pressed }) => { 
          const style = { ...styles.continent, margin: screenHeight / 200 }
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
        style={({ pressed }) => { 
          const style = { ...styles.continent, margin: screenHeight / 200 }
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
        style={({ pressed }) => { 
          const style = { ...styles.continent, margin: screenHeight / 200 }
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
        style={({ pressed }) => { 
          const style = { ...styles.continent, margin: screenHeight / 200 }
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
        style={({ pressed }) => { 
          const style = { ...styles.continent, margin: screenHeight / 200 }
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
