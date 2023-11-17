import './NavTab.css'
import { NavLink, useNavigate } from 'react-router-dom'
import profile from '../../images/profile.svg'

const NavTab = ({ isOpenNavTab, toggleNavTab }) => {
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate('/profile')
    toggleNavTab()
  }

  return (
    <aside className={`nav-tab ${isOpenNavTab ? 'nav-tab_opened' : ''}`}>
      <nav className='nav-tab__menu'>
        <button
          onClick={toggleNavTab}
          className='nav-tab__close-button hover-element'
          aria-label='Зарыть меню'
          type='button'
        />
        <NavLink
          onClick={toggleNavTab}
          className={({isActive, isPending}) =>
          isPending ? 'nav-tab__link hover-element' : isActive ? 'nav-tab__link hover-element nav-tab__link-used' : 'nav-tab__link hover-element'}
          to='/'
        >
          Главная
        </NavLink>
        <NavLink
          onClick={toggleNavTab}
          className={({isActive, isPending}) =>
          isPending ? 'nav-tab__link hover-element' : isActive ? 'nav-tab__link hover-element nav-tab__link-used' : 'nav-tab__link hover-element'}
          to='/movies'
        >
          Фильмы
        </NavLink>
        <NavLink
          onClick={toggleNavTab}
          className={({isActive, isPending}) =>
          isPending ? 'nav-tab__link hover-element' : isActive ? 'nav-tab__link hover-element nav-tab__link-used' : 'nav-tab__link hover-element'}
          to='/saved-movies'
        >
          Сохранённые фильмы
        </NavLink>
        <button className='nav-tab__profile-button hover-element' onClick={ goToProfile } type='button'>
          Акаунт
          <span className='nav-tab__profile-round'>
            <img className='nav-tab__profile-icon' src={profile} alt='Иконка профиля' />
          </span>
        </button>
      </nav>
    </aside>
  )
}

export default NavTab
