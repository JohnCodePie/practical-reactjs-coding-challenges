import './index.scss'
import ITextAreaProps from '../Interfaces/ITextAreaProps'
import { useEffect, useState } from 'react'
import IResultBoxProps from '../Interfaces/IResultBoxProps'

const ResultBox = (props: IResultBoxProps) => {
  const [resultBar, setResultBar] = useState([{ title: '', value: 0 }])

  useEffect(() => {
    setResultBar([
      {
        title: 'Words',
        value: props.numberOfWords,
      },
      {
        title: 'Characters',
        value: props.numberOfCharacters,
      },
      {
        title: 'Sentences',
        value: 0,
      },
      {
        title: 'Paragraphs ',
        value: 0,
      },
      {
        title: 'Pronouns',
        value: 0,
      },
    ])
  }, [props.numberOfCharacters])

  return (
    <div className="result-bar">
      {resultBar.map((e) => (
        <div className="result-box" key={e.title}>
          <span className="box-title">{e.title}</span>
          <span className="box-value">{e.value}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox
