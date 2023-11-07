import './Register.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'

function Register() {
  return (
    <main className="register">
      <img className="register__logo" src={logo} alt="logo" />
      <h1 className="register__hello">Добро пожаловать!</h1>
      <form className='register__form' action="">
        <span className='register__heading'>Имя</span>
        <input type="text" className='register__input' />
        <span className='register__heading'>E-mail</span>
        <input type="text" className='register__input' />
        <span className='register__heading'>Пароль</span>
        <input type="text" className='register__input' />
      </form>
      <button className='register__button hover-element-button'>Зарегистрироваться</button>
      <p className='register__question'>Уже зарегистрированы?<Link className='register__signin hover-element-link' to="/signin">Войти</Link></p>
    </main>
  )
}

export default Register