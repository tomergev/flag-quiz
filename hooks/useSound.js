import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'

const useSound = (audioFile) => {
  const [sound, setSound] = useState()
  
  async function playSound() {    
    const { sound } = await Audio.Sound.createAsync(audioFile)
    setSound(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined
  }, [sound])

  return playSound
}

export default useSound