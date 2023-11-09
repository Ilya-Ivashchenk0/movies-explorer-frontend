import './NavTab.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import profile from '../../images/profile.svg'

function NavTab({ isOpenNavTab, toggleNavTab }) {
  const location = useLocation()
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
        <Link onClick={toggleNavTab} className={`nav-tab__link hover-element-link ${location.pathname === '/' ? 'nav-tab__link-used' : ''}`} to='/'>Главная</Link>
        <Link onClick={toggleNavTab} className={`nav-tab__link hover-element-link ${location.pathname === '/movies' ? 'nav-tab__link-used' : ''}`} to='/movies'>Фильмы</Link>
        <Link onClick={toggleNavTab} className={`nav-tab__link hover-element-link ${location.pathname === '/saved-movies' ? 'nav-tab__link-used' : ''}`} to='/saved-movies'>Сохранённые фильмы</Link>
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
