import './NavTab.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import profile from '../../images/profile.svg'
import close from '../../images/close.svg'

function NavTab({ isOpenNavTab, toggleNavTab }) {
  const location = useLocation()
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate('/profile')
  }

  return (
    <section className={`nav-tab ${isOpenNavTab ? 'nav-tab__open' : ''}`}>
      <div className='nav-tab__menu'>
        <button
          onClick={toggleNavTab}
          className='nav-tab__close-button hover-element-button'
          aria-label='Иконка меню'
        >
          <img
            src={close}
            alt='Закрыть меню'
            className='nav-tab__close-icon'
          />
        </button>
        <Link className={`nav-tab__link hover-element-link ${location.pathname === '/' ? 'nav-tab__link-used' : ''}`} to='/'>Главная</Link>
        <Link className={`nav-tab__link hover-element-link ${location.pathname === '/movies' ? 'nav-tab__link-used' : ''}`} to='/movies'>Фильмы</Link>
        <Link className={`nav-tab__link hover-element-link ${location.pathname === '/saved-movies' ? 'nav-tab__link-used' : ''}`} to='/saved-movies'>Сохранённые фильмы</Link>
        <button className='nav-tab__profile-button hover-element-button' onClick={ goToProfile }>
          Акаунт
          <div className='nav-tab__profile-round'>
            <img className='nav-tab__profile-icon' src={profile} alt="profile icon" />
          </div>
        </button>
      </div>
    </section>
  )
}

export default NavTab
