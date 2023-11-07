import './Header.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import burger from '../../images/burger.svg'
import profile from '../../images/profile.svg'

function Header({ toggleNavTab, isOpenNavTab }) {
  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const toggleLogin = () => {
    setLoggedIn(true)
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
    <header className='header'>
      <Link className='header__logo hover-element-link' to='/' />
      {loggedIn && windowWidth > 1279 && (
        <div className='header__dashboard'>
          <div className='header__movies-links'>
            <Link to='/movies' className='header__link hover-element-link'>Фильмы</Link>
            <Link to='/saved-movies' className='header__link hover-element-link'>Сохранённые фильмы</Link>
          </div>
          <button className='header__profile-button hover-element-button' onClick={goToPofile} type='submit'>
            Аккаунт
            <span className='header__profile-round'>
              <img className='header__profile-icon' src={profile} alt='profile icon' />
            </span>
          </button>
        </div>
      )}
      {!loggedIn && (
        <nav className='header__sign-links'>
          <Link to='/signup' className='header__link hover-element-link'>Регистрация</Link>
          <Link to='/signin'>
            <button className='header__signin-button hover-element-button' type='button'>Войти</button>
          </Link>
        </nav>
      )}
      {loggedIn && windowWidth <= 1279 && (
        <button
          onClick={toggleNavTab}
          onClose={toggleLogin}
          className='header__menu-button hover-element-button'
          aria-label='Иконка меню'
          type='button'
        >
          <img
            src={burger}
            alt='Открыть меню'
            className='header__menu-icon'
          />
        </button>
      )}
    </header >
  )
}

export default Header
