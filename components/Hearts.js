import { AntDesign } from '@expo/vector-icons'
import { 
  useWindowDimensions,
  View, 
} from 'react-native'

const Hearts = ({ numOfIncorrectSelections }) => {
  const { height: screenHeight } = useWindowDimensions()
  
  return (
    <View style={{ flexDirection: 'row-reverse' }}>
      <AntDesign 
        color='red' 
        name={numOfIncorrectSelections <= 0 ? 'heart' : 'hearto'} 
        size={18} 
        style={{ marginLeft: screenHeight / 350 }}
      />
      <AntDesign 
        color='red' 
        name={numOfIncorrectSelections <= 1 ? 'heart' : 'hearto'}  
        size={18} 
        style={{ marginLeft: screenHeight / 350 }}
      />
      <AntDesign 
        color='red' 
        name={numOfIncorrectSelections <= 2 ? 'heart' : 'hearto'}  
        size={18} 
      />
    </View>
  )
}

export default Hearts