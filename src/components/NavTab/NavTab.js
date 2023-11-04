import './NavTab.css'
import { Link } from 'react-router-dom'
import profile from '../../../images/profile.svg'

function NavTab() {
  return (
    <section className='nav-tab'>
      <Link className='nav-tab__link'>Главная</Link>
      <Link className='nav-tab__link'>Фильмы</Link>
      <Link className='nav-tab__link'>Сохранённые фильмы</Link>
      <button className='nav-tab__button'>
        <div className='nav-tab__round'>
          <img className='nav-tab__icon' src={profile} alt="" />
        </div>
      </button>
    </section>
  )
}

export default NavTab
