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

// TODO: Component not remounting on back https://stackoverflow.com/questions/34297540/are-components-re-mounted-when-back-buttoned-from-its-subsequent-screen-in-react
const handleBackClickAndroid = () => {
  const navigation = useNavigation()
  const playMouseClick = useSound(clickMouse) 
  BackHandler.addEventListener(
    'hardwareBackPress',
    () => {
      const route = navigation.getCurrentRoute()
      if (route.name === 'index') BackHandler.exitApp()
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