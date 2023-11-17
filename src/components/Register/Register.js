import './Register.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/logo.svg'
import { register, login } from '../../utils/auth'
import { useFormValidation } from '../../utils/tools'

const Register = ({ setLoggedIn }) => {
  const navigate = useNavigate()
  const { handleChange, errors, isValid } = useFormValidation() // хук валидации

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    register(name, email, password)
      .then(() => {
        login(email, password)
          .then(() => {
            setLoggedIn(true)
            navigate('/movies')
          })
          .catch((e) => console.log(e))
      })
      .catch((e) => console.log(e))
  }

  return (
    <main className='register'>
      <Link to='/'>
        <img className='register__logo hover-element' src={logo} alt='Логотип' />
      </Link>
      <h1 className='register__hello'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={handleSubmit} name='register' noValidate>
        <label className='register__heading' htmlFor='name'>
          Имя
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={(e) => {
            handleChangeName(e)
            handleChange(e)
          }}
          autoComplete='name'
          className={`register__input ${errors.name ? 'register__input-error' : ''}`}
          placeholder='Введите имя'
          minLength='2'
          maxLength='30'
          required
        />
        <span className={`register__error ${errors.name ? 'register__error-visible' : ''}`}>{errors.name}</span>
        <label className='register__heading' htmlFor='email'>
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
          className={`register__input ${errors.email ? 'register__input-error' : ''}`}
          placeholder='Введите email'
          minLength='2'
          maxLength='40'
          required
        />
        <span className={`register__error ${errors.email ? 'register__error-visible' : ''}`}>{errors.email}</span>
        <label className='register__heading' htmlFor='password'>
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
          className={`register__input ${errors.password ? 'register__input-error' : ''}`}
          placeholder='Введите пароль'
          minLength='2'
          maxLength='200'
          required
        />
        <span className={`register__error ${errors.password ? 'register__error-visible' : ''}`}>{errors.password}</span>
        <button className={`register__button hover-element ${!isValid ? 'register__button_disabled' : ''}`} type='submit' disabled={!isValid}>
          Зарегистрироваться
        </button>
        <p className='register__question'>
          Уже зарегистрированы?<Link className='register__signin hover-element-link' to='/signin'>
            Войти
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Register
