import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  shadow: {
    // ios Shadow                    
    shadowColor: '#171717',
    shadowOffset: { height: 4, width: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android Shadow
    elevation: 2,
    shadowColor: '#171717',
    borderRadius: 3,
  }
})
