import './Login.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'

function Login() {
  return (
    <main className='login'>
      <Link to='/'>
        <img className='login__logo' src={logo} alt='Логотип' />
      </Link>
      <h1 className='login__hello'>Рады видеть!</h1>
      <form className='login__form' name='login'>
        <label className='login__heading' htmlFor='email'>E-mail</label>
        <input
          type='text'
          id='email'
          className='login__input'
          placeholder='Введите email'
          minLength='2'
          maxLength='40'
          required
        />
        <label className='login__heading' htmlFor='password'>Пароль</label>
        <input
          type='text'
          id='password'
          className='login__input'
          placeholder='Введите пароль'
          minLength='2'
          maxLength='200'
          required
        />
        <button className='login__button hover-element-button' type='submit'>Войти</button>
      </form>
      <p className='login__question'>Ещё не зарегистрированы?<Link className='login__signup hover-element-link' to='/signup'>Регистрация</Link></p>
    </main>
  )
}

export default Login
