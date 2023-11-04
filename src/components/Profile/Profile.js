import './Profile.css'
import { useState } from 'react'
import Header from '../Header/Header'
import NavTab from '../NavTab/NavTab'

function Profile() {
  const [isOpenNavTab, setIsOpenNavTab] = useState(false)

  const toggleNavTab = () => {
    setIsOpenNavTab(!isOpenNavTab)
  }

  return (
    <div className='profile'>
      <div className={`profile__overlay ${isOpenNavTab ? 'profile__overlay_type_active' : ''}`}>
        <Header toggleNavTab={toggleNavTab} isOpenNavTab={isOpenNavTab} />
        <h1 className='profile__hello'>Привет, Виталий!</h1>
        <div className='profile__info'>
          <div className='profile__name'>
            <p>Имя</p>
            <p>Виталий</p>
          </div>
          <div className='profile__email'>
            <p>E-mail</p>
            <p>pochta@yandex.ru</p>
          </div>
        </div>
        <button className='profile__edit-button hover-element-button'>Редактировать</button>
        <button className='profile__signout-button hover-element-button'>Выйти из аккаунта</button>
      </div>
      <NavTab isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
    </div>
  )
}

export default Profile
