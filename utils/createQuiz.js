const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min) 
}

const createQuiz = (countries) => {
  if (countries.length < 4) return [] // Just adding this so there's no infinite loop below
  
  const quiz = []
  
  countries.forEach((country, index) => {
    const answer = {
      flag: country?.flags?.png, 
      id: country?.ccn3,
      name: country?.name?.common, 
    }
    const choices = [{ 
      flag: country?.flags?.png, 
      id: country?.ccn3,
      name: country?.name?.common,  
    }]

    const indexesUsed = [index]
    while (choices.length < 4) {
      let randomInt = getRandomInt(0, countries.length)
      while (indexesUsed.includes(randomInt)) {
        randomInt = getRandomInt(0, countries.length)
      }
      indexesUsed.push(randomInt)
      choices.push({ 
        flag: countries[randomInt]?.flags?.png,
        id: countries[randomInt]?.ccn3,
        name: countries[randomInt]?.name?.common, 
      })
    }

    quiz.push({ answer, choices: [...choices].sort(() => Math.random() - 0.5) })
  })

  return quiz
}

export default createQuiz