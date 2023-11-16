import './Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../utils/auth'
import logo from '../../images/logo.svg'
import { useFormValidation } from '../../utils/tools' // добавлен импорт хука валидации

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate()
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation() // добавлен хук валидации

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password)
      .then(() => {
        setLoggedIn(true)
        navigate('/')
      })
      .catch((loginError) => {
        console.error('Ошибка при входе:', loginError)
        // Ваш код для обработки ошибки входа, например, установка состояния с сообщением об ошибке входа
      })
  }

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
          required
        />
        <span className='login__error'>{errors.email}</span>
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
          required
        />
        <span className={`login__error ${errors.password ? 'login__error-visible' : ''}`}>{errors.password}</span>
        <button className={`login__button hover-element ${!isValid ? 'login__button_disabled' : ''}`} type='submit' disabled={!isValid}>
          Войти
        </button>
      </form>
      <p className='login__question'>
        Ещё не зарегистрированы?<Link className='login__signup hover-element-link' to='/signup'>
          Регистрация
        </Link>
      </p>
    </main>
  )
}

export default Login
