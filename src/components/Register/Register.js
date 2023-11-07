import './Register.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'

function Register() {
  const submitForm = () => {
    console.log('submit')
  }

  const errorMessage = 'Что-то пошло не так...'

  return (
    <main className='register'>
      <Link className='register__logo-link' to='/'>
        <img className='register__logo' src={logo} alt='Логотип' />
      </Link>
      <h1 className='register__hello'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={submitForm} name='register' noValidate>
        <label className='register__heading' htmlFor='name'>Имя</label>
        <input
          type='text'
          id='name'
          value={'Виталий'}
          className='register__input'
          placeholder='Введите имя'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='validate-error'>{errorMessage}</span>
        <label className='register__heading' htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          value={'pochta@yandex.ru'}
          className='register__input'
          placeholder='Введите email'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='validate-error'>{errorMessage}</span>
        <label className='register__heading' htmlFor='password'>Пароль</label>
        <input
          type='password'
          id='password'
          value={'11111111111111'}
          className='register__input register__input-error'
          placeholder='Введите пароль'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='validate-error__visible'>{errorMessage}</span>
        <button className='register__button hover-element-button' type='submit'>Зарегистрироваться</button>
        <p className='register__question'>Уже зарегистрированы?<Link className='register__signin hover-element-link' to='/signin'>Войти</Link></p>
      </form>
    </main>
  )
}

export default Register
