import { 
  Stack, 
  useNavigation, 
} from 'expo-router'
import { 
  BackHandler,
  Platform,
  StatusBar, 
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { Provider } from 'react-redux'

import clickMouse from '../audio/clickMouse.mp3'
import useSound from '../hooks/useSound'
import { store } from '../store'

const handleBackClickAndroid = () => {
  const navigation = useNavigation()
  const playMouseClick = useSound(clickMouse) 
  BackHandler.addEventListener(
    'hardwareBackPress',
    () => {
      const { index: indexMainDashboard } = navigation.getState() || {}
      if (indexMainDashboard === 0) BackHandler.exitApp()
      else {
        playMouseClick()
        navigation.goBack()
      }
      return true
    }
  )
}

const Layout = () => {    
  if (Platform.OS === 'android') handleBackClickAndroid()
  
  const theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme,
      background: '#343A40',
    }
  }
  
  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <StatusBar barStyle='light-content' /> 
        <Provider store={store} >
          <Stack 
            screenOptions={{
              animation: Platform.OS === 'ios' ? 'simple_push' : 'slide_from_right',
              headerShown: false,  
              presentation: 'card',
            }}
          />

        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default Layout