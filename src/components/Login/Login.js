import './Login.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'

function Login() {
  return (
    <main className='login'>
      <Link to='/'>
        <img className='login__logo hover-element' src={logo} alt='Логотип' />
      </Link>
      <h1 className='login__hello'>Рады видеть!</h1>
      <form className='login__form' name='login'>
        <label className='login__heading' htmlFor='email'>E-mail</label>
        <input
          type='text'
          id='email'
          defaultValue={'pochta@yandex.ru'}
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
