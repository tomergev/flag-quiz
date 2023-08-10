import { useWindowDimensions } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'

export default ({ progress }) => {
  const { height: screenHeight } = useWindowDimensions()
  
  return (
    <ProgressBar 
      borderWidth={0}
      color='#42f548'
      height={screenHeight / 100} 
      progress={progress} 
      style={{ marginBottom: screenHeight / 300 }}
      unfilledColor='#495057'
      width={null} 
    />
  )
}