import './Register.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/logo.svg'
import { register, login } from '../../utils/auth'

const Register = ({setLoggedIn}) => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeName(e) {
    setName(e.target.value)
    // setEmailError(validateEmail(e.target.value)) // валидация инпута
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value)
    // setEmailError(validateEmail(e.target.value)) // валидация инпута
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
    // setPasswordError(validatePassword(e.target.value)) // валидация инпута
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
        <label className='register__heading' htmlFor='name'>Имя</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={handleChangeName}
          autoComplete="name"
          className='register__input'
          placeholder='Введите имя'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='register__error'></span>
        <label className='register__heading' htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={handleChangeEmail}
          autoComplete='email'
          className='register__input'
          placeholder='Введите email'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='register__error'></span>
        <label className='register__heading' htmlFor='password'>Пароль</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handleChangePassword}
          autoComplete="current-password"
          className='register__input register__input-error'
          placeholder='Введите пароль'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='register__error-visible'></span>
        <button className='register__button hover-element' type='submit'>Зарегистрироваться</button>
        <p className='register__question'>Уже зарегистрированы?<Link className='register__signin hover-element-link' to='/signin'>Войти</Link></p>
      </form>
    </main>
  )
}

export default Register
