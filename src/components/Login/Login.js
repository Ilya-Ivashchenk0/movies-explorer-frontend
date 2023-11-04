import './Login.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'

function Login() {
  return (
    <div className="login">
      <img className="login__logo" src={logo} alt="logo" />
      <h1 className="login__hello">Рады видеть!</h1>
      <form className='login__form' action="">
        <span className='login__heading'>E-mail</span>
        <input type="text" className='login__input' />
        <span className='login__heading'>Пароль</span>
        <input type="text" className='login__input' />
      </form>
      <button className='login__button hover-element-button'>Войти</button>
      <p className='login__question'>Ещё не зарегистрированы?<Link className='login__signup hover-element-link' to="/signup">Регистрация</Link></p>
    </div>
  )
}

export default Login
