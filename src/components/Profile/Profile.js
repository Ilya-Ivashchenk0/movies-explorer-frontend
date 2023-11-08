import './Profile.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(true)
  const [validateError] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const signout = () => {
    navigate('/')
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)
  }

  return (
    <main className='profile'>
      <section className='profile__secion'>
        <h1 className='profile__hello'>Привет, Виталий!</h1>
        <form className='profile__form' name='pofile' noValidate>
          <div className={`profile__name ${isInputFocused ? 'profile__name_focused' : ''}`}>
            <label className='profile__label' htmlFor='username'>Имя</label>
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className='profile__input'
              type='text'
              id='username'
              placeholder='Ваше имя'
              defaultValue='Виталий'
              minLength='2'
              maxLength='30'
              disabled={!isEditing}
              required
            />
          </div>
          <div className='profile__email'>
            <label className='profile__label' htmlFor='email'>E-mail</label>
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className='profile__input'
              type='email'
              id='email'
              placeholder='Ваш email'
              defaultValue={'pochta@yandex.ru'}
              minLength='2'
              maxLength='40'
              disabled={!isEditing}
              required
            />
          </div>
          {!isEditing && (
            <>
              <button onClick={handleEdit} className='profile__edit-button hover-element' type='button'>Редактировать</button>
              <button onClick={signout} className='profile__signout-button hover-element' type='button'>Выйти из аккаунта</button>
            </>
          )}
          {isEditing && (
            <>
              <span className={`${validateError ? 'profile__error-visable' : 'profile__error'}`}>При обновлении профиля произошла ошибка.</span>
              <button disabled={validateError} className={`profile__save-button ${validateError ? 'profile__save-button_disabled' : 'hover-element'}`}>Сохранить</button>
            </>
          )}
        </form>
      </section>
    </main>
  )
}

export default Profile
