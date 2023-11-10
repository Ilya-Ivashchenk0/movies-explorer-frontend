import './Profile.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signout } from '../../utils/auth'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { mainApi } from '../../utils/MainApi'

const Profile = ({ setLoggedIn }) => {
  const navigate = useNavigate()

  const {currentUser, setCurrentUser} = React.useContext(CurrentUserContext)

  const [isEditing, setIsEditing] = useState(false)
  const [validateError] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)
  const [editDone, setEditDone] = useState(null)
  const [isEditSuccefull, setIsEditSuccefull] = useState(false)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const logout = () => {
    signout()
      .then(() => {
        setLoggedIn(false)
        navigate('/', { replace: true })
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  const handleProfileEdit = (e) => {
    e.preventDefault()
    handleEdit()

    mainApi.setUserInfo({name, email})
      .then((res) => {
        setCurrentUser(oldValue => ({...oldValue, name: res.data.name, email: res.data.email}))
        setName(res.name)
        setEmail(res.email)
        setEditDone('Обновление профиля прошло успешно!')
        setIsEditSuccefull(true)
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
        setIsEditSuccefull(false)
        setEditDone('При обновлении профиля произошла ошибка.')
      })
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)
  }

  useEffect(() => {
    if (editDone) {
      const delay = setTimeout(() => {
        setEditDone(null)
      }, 3000)
      return () => clearTimeout(delay)
    }
  }, [editDone])

  return (
    <main className='profile'>
      <section className='profile__secion'>
        <h1 className='profile__hello'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' name='pofile' onSubmit={handleProfileEdit} noValidate>
          <div className={`profile__name ${isInputFocused ? 'profile__name_focused' : ''}`}>
            <label className='profile__label' htmlFor='name'>Имя</label>
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className='profile__input'
              type='text'
              id='name'
              defaultValue={currentUser.name}
              onChange={handleChangeName}
              autoComplete='off'
              placeholder='Ваше имя'
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
              defaultValue={currentUser.email}
              onChange={handleChangeEmail}
              autoComplete='off'
              placeholder='Ваш email'
              minLength='2'
              maxLength='40'
              disabled={!isEditing}
              required
            />
          </div>
          <div className='profile__success-box'>
            {editDone && <p className={`profile__edit-success ${!isEditSuccefull ? 'profile__edit-success_faled' : ''}`}>{ editDone }</p>}
          </div>
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className='profile__edit-button hover-element'
                type='button'
              >
                Редактировать
              </button>
              <button
              onClick={logout}
              className='profile__signout-button hover-element' type='button'
              >
                Выйти из аккаунта
              </button>
            </>
          ) : (
            <>
              <span className={`${validateError ? 'profile__error-visable' : 'profile__error'}`}>При обновлении профиля произошла ошибка.</span>
              <button
                type='submit'
                disabled={validateError}
                className={`profile__save-button ${validateError ? 'profile__save-button_disabled' : 'hover-element'}`}
              >
                Сохранить
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  )
}

export default Profile
