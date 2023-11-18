import './Register.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/logo.svg'
import consts from '../../utils/consts'
import { register, login } from '../../utils/auth'
import { useFormValidation } from '../../hooks/formValidator'
import Notify from '../Notify/Notify'

const Register = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate()
  const { handleChange, errors, isValid } = useFormValidation() // хук валидации

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showNotify, setShowNotify] = useState(false)
  const [successSignup, setSuccessSignup] = useState(false)
  const [message, setMessage] = useState('')
  const [inputsDisabled, setInputsDisabled] = useState(false)

  const handleChangeName = (e) => {
    setName(e.target.value)
    handleChange(e)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    handleChange(e)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    handleChange(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInputsDisabled(true)

    register(name, email, password)
      .then((res) => {
        setSuccessSignup(true)
        setMessage(res.mesage)
        setShowNotify(true)
        login(email, password)
          .then(() => {
            setLoggedIn(true)
            navigate('/movies')
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => {
        setMessage(consts.FAILED_SIGNUP_MESSAGE)
        setInputsDisabled(false)
        setShowNotify(true)
        console.log(err)
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
    <main className='register'>
      <Link to='/'>
        <img className='register__logo hover-element' src={logo} alt='Логотип' />
      </Link>
      <h1 className='register__hello'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={handleSubmit} name='register' noValidate>
        <label className='register__heading' htmlFor='name'>Имя</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={(e) => handleChangeName(e)}
          autoComplete='name'
          className={`register__input ${errors.name ? 'register__input-error' : ''}`}
          placeholder='Введите имя'
          minLength='2'
          maxLength='30'
          disabled={inputsDisabled}
          required
        />
        <span className={`register__error ${errors.name ? 'register__error-visible' : ''}`}>{errors.name}</span>
        <label className='register__heading' htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => handleChangeEmail(e)}
          autoComplete='email'
          className={`register__input ${errors.email ? 'register__input-error' : ''}`}
          placeholder='Введите email'
          minLength='2'
          maxLength='40'
          disabled={inputsDisabled}
          required
        />
        <span className={`register__error ${errors.email ? 'register__error-visible' : ''}`}>{errors.email}</span>
        <label className='register__heading' htmlFor='password'>Пароль</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => handleChangePassword(e)}
          autoComplete='current-password'
          className={`register__input ${errors.password ? 'register__input-error' : ''}`}
          placeholder='Введите пароль'
          minLength='2'
          maxLength='200'
          disabled={inputsDisabled}
          required
        />
        <span className={`register__error ${errors.password ? 'register__error-visible' : ''}`}>{errors.password}</span>
        <button
          className={`register__button hover-element ${!isValid || inputsDisabled ? 'register__button_disabled' : ''}`}
          type='submit'
          disabled={!isValid || inputsDisabled}
        >
          Зарегистрироваться
        </button>
        <p className='register__question'>
          Уже зарегистрированы?<Link className='register__signin hover-element' to='/signin'>
            Войти
          </Link>
        </p>
      </form>
      {showNotify && <Notify message={message} isSuccess={successSignup}/>}
    </main>
  )
}

export default Register
