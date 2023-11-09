import './Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../utils/auth'
import logo from '../../images/logo.svg'

const Login = ({setLoggedIn}) => {
  const navigate = useNavigate()

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
      .catch((e) => console.log(e))
  }

  return (
    <main className='login'>
      <Link to='/'>
        <img className='login__logo hover-element' src={logo} alt='Логотип' />
      </Link>
      <h1 className='login__hello'>Рады видеть!</h1>
      <form className='login__form' onSubmit={handleSubmit} name='login'>
        <label className='login__heading' htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          onChange={handleChangeEmail}
          autoComplete="email"
          className='login__input'
          placeholder='Введите email'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='login__error'>{'Что-то пошло не так...'}</span>
        <label className='login__heading' htmlFor='password'>Пароль</label>
        <input
          type='password'
          id='password'
          onChange={handleChangePassword}
          autoComplete="current-password"
          placeholder='Введите пароль'
          className='login__input'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='login__error-visible'>{'Что-то пошло не так...'}</span>
        <button className='login__button hover-element' type='submit'>Войти</button>
      </form>
      <p className='login__question'>Ещё не зарегистрированы?<Link className='login__signup hover-element-link' to='/signup'>Регистрация</Link></p>
    </main>
  )
}

export default Login
