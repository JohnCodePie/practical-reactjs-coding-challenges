import { useEffect, useState, useRef, MutableRefObject } from 'react'
import './index.scss'
import ITextAreaProps from '../Interfaces/ITextAreaProps'

const TextArea = (props: ITextAreaProps) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    props.onChangeText(inputValue)
  }, [inputValue])

  return (
    <textarea
      className="text-area"
      placeholder="Paste your text here..."
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value)
      }}
    />
  )
}

export default TextArea
