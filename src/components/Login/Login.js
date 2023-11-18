import './Login.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../utils/auth'
import logo from '../../images/logo.svg'
import { useFormValidation } from '../../hooks/formValidator'
import consts from '../../utils/consts'
import Notify from '../Notify/Notify'


const Login = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate()
  const { handleChange, errors, isValid } = useFormValidation() // хук валидации

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showNotify, setShowNotify] = useState(false)
  const [successSignin, setSuccessSignin] = useState(false)
  const [message, setMessage] = useState('')
  const [inputsDisabled, setInputsDisabled] = useState(false)

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInputsDisabled(true)

    login(email, password)
      .then((res) => {
        setMessage(res.message)
        setSuccessSignin(true)
        setShowNotify(true)
        setLoggedIn(true)
        navigate('/movies')
      })
      .catch((err) => {
        setSuccessSignin(false)
        setMessage(consts.FAILED_SIGNIN_MESSAGE)
        setShowNotify(true)
        setInputsDisabled(false)
      })
  }

  useEffect(() => {
    if (showNotify) {
      const delay = setTimeout(() => {
        setShowNotify(false)
      }, 2500)
      return () => clearTimeout(delay)
    }
  }, [showNotify])

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies')
    }
  }, [loggedIn, navigate])

  return (
    <main className='login'>
      <Link to='/'>
        <img className='login__logo hover-element' src={logo} alt='Логотип' />
      </Link>
      <h1 className='login__hello'>Рады видеть!</h1>
      <form className='login__form' onSubmit={handleSubmit} name='login'>
        <label className='login__heading' htmlFor='email'>
          E-mail
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => {
            handleChangeEmail(e)
            handleChange(e)
          }}
          autoComplete='email'
          className={`login__input ${errors.email ? 'login__input-error' : ''}`}
          placeholder='Введите email'
          minLength='2'
          maxLength='40'
          disabled={inputsDisabled}
          required
        />
        <span className={`login__error ${errors.email ? 'login__error-visible' : ''}`}>{errors.email}</span>
        <label className='login__heading' htmlFor='password'>
          Пароль
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => {
            handleChangePassword(e)
            handleChange(e)
          }}
          autoComplete='current-password'
          placeholder='Введите пароль'
          className={`login__input ${errors.password ? 'login__input-error' : ''}`}
          minLength='2'
          maxLength='200'
          disabled={inputsDisabled}
          required
        />
        <span className={`login__error ${errors.password ? 'login__error-visible' : ''}`}>{errors.password}</span>
        <button className={`login__button hover-element ${!isValid || inputsDisabled ? 'login__button_disabled' : ''}`} type='submit' disabled={!isValid || inputsDisabled}>
          Войти
        </button>
      </form>
      <p className='login__question'>
        Ещё не зарегистрированы?<Link className='login__signup hover-element' to='/signup'>
          Регистрация
        </Link>
      </p>
      {showNotify && <Notify message={message} isSuccess={successSignin}/>}
    </main>
  )
}

export default Login
