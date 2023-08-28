import { useCallback, useEffect, useRef, useState } from 'react'
import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'

const App = () => {
  const [numberOfCharacters, setNumberOfCharacters] = useState(0)
  const [numberOfWords, setNumberOfWords] = useState(0)
  /*  const [numberOfCharacters, setNumberOfCharacters] = useState(0)
  const [numberOfCharacters, setNumberOfCharacters] = useState(0) */

  function getWordCount(s: string) {
    s = s.replace(/(^\s*)|(\s*$)/gi, '') //exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi, ' ') //2 or more space to 1
    s = s.replace(/\n /, '\n') // exclude newline with a start spacing
    return s.split(' ').filter(function (str) {
      return str != ''
    }).length
  }

  const onChangeText = useCallback((value: string) => {
    setNumberOfCharacters(value.length)
    setNumberOfWords(getWordCount(value))
  }, [])

  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <ResultBox numberOfCharacters={numberOfCharacters} numberOfWords={numberOfWords} />
          <TextArea onChangeText={onChangeText} />
          <BottomResultBox />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
