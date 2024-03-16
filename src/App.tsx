import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [words, setWords] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    if (words.length < 2) {
      fetch("https://trouve-mot.fr/api/random/10")
        .then(res => res.json())
        .then(words => words.map((word: { name: string }) => word.name))
        .then((words) => setWords((current) => [...current, ...words]))
    }
  }, [words.length])

  const updateWordList = () => {
    const newWords = words.slice(1, words.length)
    setWords([...newWords])
  }
  const handleValidate = () => {
    setScore(currentScore => currentScore + Math.round(words[0].length / 2))
    updateWordList()
  }

  const handlePass = () => {
    updateWordList()
  }

  return (
    <main className="main">
      <section className="header">
        <p><span className="legend">SCORE :</span> <span className="score">{score}</span></p>
      </section>
      <section className="word">
        {words.length > 0 ? (
          <h1>{words[0].toUpperCase()}</h1>
        ) : 'LOADING'}
      </section>
      <section className="controls">
        <button className="validate" onClick={handleValidate}>VALIDER</button>
        <button className="pass" onClick={handlePass}>PASSER</button>
      </section>
    </main>
  )
}

export default App
