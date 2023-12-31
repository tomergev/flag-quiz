import { 
  StyleSheet,
  Text, 
  View, 
} from 'react-native'

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
  }
})

const ResultQuiz = ({ numCorrectSelections, resultQuiz } = {}) => {
  return (
    <View
      style={{ 
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View 
        style={{
          alignSelf: 'center',
          flexDirection: 'column',
        }}
      >
        <Text style={styles.text}>
          Result: {numCorrectSelections}
        </Text>
        <Text style={styles.text}>
          Best: {resultQuiz.numCorrectSelections || 0}
        </Text>
      </View>
    </View>
  )
}

export default ResultQuiz
