import './Header.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import burger from '../../images/burger.svg'
import close from '../../images/close.svg'
import profile from '../../images/profile.svg'

function Header() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleResize = () => { // обработчик изменения размера окна
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize) // добавляем слушатель события при монтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize) // убираем слушатель события при размонтировании компонента
    }
  }, [])

  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt="Логотип промо блока" className="header__logo" />
      </Link>
      {loggedIn && windowWidth >= 768 && (
        <div className='header__dashboard'>
          <div className='header__movies-links'>
            <Link to='/movies' className='header__link'>Фильмы</Link>
            <Link to='/saved-movies' className='header__link'>Сохранённые фильмы</Link>
          </div>
          <button className='header__profile-button'>
            Акаунт
            <div className='header__profile-round'>
              <img className='header__profile-icon' src={profile} alt="profile icon" />
            </div>
          </button>
        </div>
      )}
      {!loggedIn && (
        <div className='header__sign-links'>
          <Link to='/signup' className='header__link'>Регистрация</Link>
          <Link to='/signin'>
            <button className='header__signin-button'>Войти</button>
          </Link>
        </div>
      )}
      {windowWidth <= 767 && (
        <button
          onClick={toggleMenu}
          className='header__menu-button'
          aria-label='Иконка меню'
        >
          <img
            src={isMenuOpen ? close : burger}
            alt={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className='header__menu-icon'
          />
        </button>
      )}
    </header >
  )
}

export default Header

// {windowWidth >= 768 ? (
//   <>
//     <Link to='/'>
//       <img src={logo} alt="Логотип промо блока" className="header__logo" />
//     </Link>
//     <div>
//       <Link to='/signup' className='header__link'>Регистрация</Link>
//       <Link to='/signin'>
//         <button className='header__button'>Войти</button>
//       </Link>
//     </div>
//   </>
// ) : (
//   <div></div>
// )}

