const fetchJokes = () => {
  return new Promise( (resolve, reject) => {
    fetch('https://api.chucknorris.io/jokes/random')
      .then( (results) => {
        resolve(results.json())
      })
  })
}

export default fetchJokes;
