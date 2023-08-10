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

const ResultQuiz = ({ numCorrectAnswers } = {}) => {
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
          Result: {numCorrectAnswers}
        </Text>
        <Text style={styles.text}>
          Best: (Feature coming soon)
        </Text>
      </View>
    </View>
  )
}

export default ResultQuiz
