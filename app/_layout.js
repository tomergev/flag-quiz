import { Slot } from 'expo-router'
import { 
  StatusBar, 
  View, 
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Layout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' /> 
      <View style={{ backgroundColor: '#343A40', flex: 1, padding: 5 }}>
        <Slot />
      </View>
    </SafeAreaProvider>
  )
}

export default Layout