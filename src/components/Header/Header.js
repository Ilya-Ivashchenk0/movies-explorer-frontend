import './Header.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import profile from '../../images/profile.svg'

function Header({ toggleNavTab, isOpenNavTab }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [loggedIn, setLoggedIn] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const toggleLogin = () => {
    setLoggedIn(true)
  }

  const isMain = () => {
    if (location.pathname === '/') {
      return true
    } else {
      return false
    }
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

  const goToPofile = () => {
    navigate('/profile')
  }

  return (
    <header className={`header ${isMain() ? 'header_type_main' : ''}`}>
      <Link className='header__logo hover-element-link' to='/' />
      {loggedIn && windowWidth > 1279 && (
        <div className='header__dashboard'>
          <div className='header__movies-links'>
            <Link to='/movies' className='header__link hover-element-link'>Фильмы</Link>
            <Link to='/saved-movies' className='header__link hover-element-link'>Сохранённые фильмы</Link>
          </div>
          <button className='header__profile-button hover-element' onClick={goToPofile} type='submit'>
            Аккаунт
            <span className='header__profile-round'>
              <img className='header__profile-icon' src={profile} alt='Иконка профиля' />
            </span>
          </button>
        </div>
      )}
      {!loggedIn && (
        <nav className='header__sign-links'>
          <Link to='/signup' className='header__link hover-element-link'>Регистрация</Link>
          <Link to='/signin' className='header__signin-button hover-element'>Войти</Link>
        </nav>
      )}
      {loggedIn && windowWidth <= 1279 && (
        <button
          onClick={toggleNavTab}
          onClose={toggleLogin}
          className='header__menu-button hover-element'
          aria-label='Открыть меню'
          type='button'
        />
      )}
    </header >
  )
}

export default Header
