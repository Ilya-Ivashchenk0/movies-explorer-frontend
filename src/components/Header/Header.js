import './Header.css'
import React from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { WindowWidthContext } from '../../contexts/WindowWidthContext'
import profile from '../../images/profile.svg'

const Header = ({ toggleNavTab, loggedIn }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const windowWidth = React.useContext(WindowWidthContext)

  const isMain = () => {
    if (location.pathname === '/') {
      return true
    } else {
      return false
    }
  }

  const goToPofile = () => {
    navigate('/profile')
  }

  return (
    <header className={`header ${isMain() ? 'header_type_main' : ''}`}>
      <Link className='header__logo hover-element' to='/' />
      {loggedIn && windowWidth > 1279 && (
        <div className='header__dashboard'>
          <div className='header__movies-links'>
            <NavLink
              to='/movies'
              className={({isActive, isPending}) =>
                isPending ? 'header__link hover-element' : isActive ? 'header__link hover-element header__link-used' : 'header__link hover-element'
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to='/saved-movies'
              className={({isActive, isPending}) =>
                isPending ? 'header__link hover-element' : isActive ? 'header__link hover-element header__link-used' : 'header__link hover-element'
              }
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink
            className={({isActive, isPending}) =>
              isPending ? 'header__profile-button hover-element' : isActive ? 'header__profile-button hover-element header__profile-button_used' : 'header__profile-button hover-element'
            }
            onClick={goToPofile}
            type='submit'
            to='/profile'
          >
            Аккаунт
            <span className='header__profile-round'>
              <img className='header__profile-icon' src={profile} alt='Иконка профиля' />
            </span>
          </NavLink>
        </div>
      )}
      {!loggedIn && (
        <nav className='header__sign-links'>
          <Link to='/signup' className='header__link hover-element'>Регистрация</Link>
          <Link to='/signin' className='header__signin-button hover-element'>Войти</Link>
        </nav>
      )}
      {loggedIn && windowWidth <= 1279 && (
        <button
          onClick={toggleNavTab}
          className='header__menu-button hover-element'
          aria-label='Открыть меню'
          type='button'
        />
      )}
    </header >
  )
}

export default Header
