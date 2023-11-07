import './Profile.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import NavTab from '../NavTab/NavTab'

function Profile() {
  const navigate = useNavigate()

  const [isOpenNavTab, setIsOpenNavTab] = useState(false)

  const toggleNavTab = () => {
    setIsOpenNavTab(!isOpenNavTab)
  }

  const handleEdit = () => {

  }

  const signout = () => {
    navigate('/')
  }

  return (
    <main className='profile'>
      <Header toggleNavTab={toggleNavTab} isOpenNavTab={isOpenNavTab} />
      <div className={`profile__overlay ${isOpenNavTab ? 'profile__overlay_type_active' : ''}`}>
        <h1 className='profile__hello'>Привет, Виталий!</h1>
        <form className='profile__form' name='pofile' noValidate>
          <div className='profile__name'>
            <label className='profile__label' htmlFor='username'>Имя</label>
            <input
              className='profile__input'
              type='text'
              id='username'
              value='Виталий'
              minLength='2'
              maxLength='30'
              required
            />
          </div>
          <div className='profile__email'>
            <label className='profile__label' htmlFor='email'>E-mail</label>
            <input
              className='profile__input'
              type='email'
              id='email'
              value={'pochta@yandex.ru'}
              minLength='2'
              maxLength='40'
              required
            />
          </div>
        </form>
        <button onClick={handleEdit} className='profile__edit-button hover-element-button' type='button'>Редактировать</button>
        <button onClick={signout} className='profile__signout-button hover-element-button' type='button'>Выйти из аккаунта</button>
      </div>
      <NavTab isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
    </main>
  )
}

export default Profile
