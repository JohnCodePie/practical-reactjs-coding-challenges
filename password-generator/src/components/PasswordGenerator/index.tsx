import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useRef, useState } from 'react'

import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'
import { AiOutlineCheck } from 'react-icons/ai'
import Checkbox from '../Checkbox'
import './index.css'
import CopyToClipboard from 'react-copy-to-clipboard'

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8)
  const [passwordText, setpasswordText] = useState<string>('')
  const [isPasswordCopied, setIsPasswordCopied] = useState<boolean>(false)
  const [isUpperCase, setIsUpperCase] = useState<boolean>(false)
  const [isLowerCase, setIsLowerCase] = useState<boolean>(true)
  const [numbersIncluded, setnumbersIncluded] = useState<boolean>(false)
  const [specialChars, setSpecialChars] = useState<boolean>(false)
  const wishlistConfig = [
    {
      type: isUpperCase,
      wishlistContent: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
      type: isLowerCase,
      wishlistContent: 'abcdefghijklmnopqrstuvwxyz',
    },
    {
      type: numbersIncluded,
      wishlistContent: '0123456789',
    },
    {
      type: specialChars,
      wishlistContent: '~!@-#$',
    },
  ]

  const onChangePasswordLength = (value: number | number[]) => {
    setPasswordLength(value as number)
  }

  function getGeneratedPassword(): string {
    let wishlist = ''
    wishlistConfig.forEach((element) => {
      if (element.type === true) wishlist += element.wishlistContent
    })
    return Array.from(crypto.getRandomValues(new Uint32Array(passwordLength)))
      .map((x) => wishlist[x % wishlist.length])
      .join('')
  }

  useEffect(() => {
    setTimeout(() => {
      setIsPasswordCopied(false)
    }, 2000)
  }, [isPasswordCopied])

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input
            type="text"
            placeholder="Your password"
            value={passwordText}
            onChange={(e) => {
              setpasswordText(e.target.value)
            }}
          />
          <Refresh
            onClick={() => {
              setpasswordText(getGeneratedPassword())
            }}
          />
        </div>
        <CopyToClipboard
          text={passwordText}
          onCopy={() => {
            setIsPasswordCopied(true)
          }}
        >
          <button className="copy-btn">
            {isPasswordCopied ? (
              <>
                <AiOutlineCheck />
                Copied
              </>
            ) : (
              <>
                <Copy />
                Copy
              </>
            )}
          </button>
        </CopyToClipboard>
      </div>
      <span className="fw-500">Weak</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox
          id="uppercase"
          label="Uppercase"
          checked={isUpperCase}
          name="upper"
          onChange={() => {
            setIsUpperCase(!isUpperCase)
          }}
        />
        <Checkbox
          id="lowercase"
          label="Lowercase"
          checked={isLowerCase}
          name="lower"
          onChange={() => {
            setIsLowerCase(!isLowerCase)
          }}
        />
        <Checkbox
          id="numbers"
          label="Numbers"
          checked={numbersIncluded}
          name="numbers"
          onChange={() => {
            setnumbersIncluded(!numbersIncluded)
          }}
        />
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={specialChars}
          name="specialChars"
          onChange={() => {
            setSpecialChars(!specialChars)
          }}
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
