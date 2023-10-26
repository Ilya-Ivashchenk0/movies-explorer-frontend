import './Header.css'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt="Логотип промо блока" className="header__logo" />
      </Link>
      <div>
        <Link href='/signup' className='header__link'>Регистрация</Link>
        <Link to='/signin'>
          <button className='header__button'>Войти</button>
        </Link>
      </div>
    </header >
  )
}

export default Header
