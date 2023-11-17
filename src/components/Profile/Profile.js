import './Profile.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signout } from '../../utils/auth'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { mainApi } from '../../utils/MainApi'
import { useFormValidation } from '../../utils/tools'
import consts from '../../utils/consts'

const Profile = ({ setLoggedIn }) => {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext)
  const { values, handleChange, isValid } = useFormValidation() // хук валидации

  const [isEditing, setIsEditing] = useState(false)
  const [validateError, setValidateError] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [editDone, setEditDone] = useState(null)
  const [isEditSuccessful, setIsEditSuccessful] = useState(false)

  const handleChangeName = (e) => {
    handleChange(e)
    setCurrentUser((oldValue) => ({ ...oldValue, name: e.target.value })) // Обновление name в контексте
  }

  const handleChangeEmail = (e) => {
    handleChange(e)
    setCurrentUser((oldValue) => ({ ...oldValue, email: e.target.value })) // Обновление email в контексте
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const logout = () => {
    localStorage.removeItem('savedSearchResults')
    localStorage.removeItem('savedSearchResultsSaved')
    signout()
      .then(() => {
        setLoggedIn(false)
        navigate('/', { replace: true })
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  const handleProfileEdit = (e) => {
    e.preventDefault()
    handleEdit()

    mainApi.setUserInfo({ name: currentUser.name, email: currentUser.email })
      .then((res) => {
        setCurrentUser((oldValue) => ({ ...oldValue, name: res.data.name, email: res.data.email }))
        setEditDone(consts.successUpdateMessage)
        setIsEditSuccessful(true)
      })
      .catch((err) => {
        setIsEditSuccessful(false)
        setEditDone(consts.failedUpdateMessage)
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

  useEffect(() => { // Проверка валидности данных при каждом изменении значений полей
    if (!isValid) {
      setValidateError(true)
    } else {
      setValidateError(false)
    }
  }, [values, isValid])

  return (
    <main className='profile'>
      <section className='profile__secion'>
        <h1 className='profile__hello'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' name='profile' onSubmit={handleProfileEdit} noValidate>
          <div className={`profile__name ${isInputFocused ? 'profile__name_focused' : ''}`}>
            <label className='profile__label' htmlFor='name'>
              Имя
            </label>
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className='profile__input'
              type='text'
              id='name'
              name='name'
              value={currentUser.name}
              onChange={(e) => {
                handleChangeName(e)
              }}
              autoComplete='off'
              placeholder='Ваше имя'
              minLength='2'
              maxLength='30'
              disabled={!isEditing}
              required
            />
          </div>
          <div className='profile__email'>
            <label className='profile__label' htmlFor='email'>
              E-mail
            </label>
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className='profile__input'
              type='email'
              id='email'
              name='email'
              value={currentUser.email}
              onChange={(e) => {
                handleChangeEmail(e)
              }}
              autoComplete='off'
              placeholder='Ваш email'
              minLength='2'
              maxLength='40'
              disabled={!isEditing}
              required
            />
          </div>
          <div className='profile__success-box'>
            {editDone && (
              <p className={`profile__edit-success ${!isEditSuccessful ? 'profile__edit-success_faled' : ''}`}>{editDone}</p>
            )}
          </div>
          {!isEditing ? (
            <>
              <button onClick={handleEdit} className='profile__edit-button hover-element' type='button'>
                Редактировать
              </button>
              <button onClick={logout} className='profile__signout-button hover-element' type='button'>
                Выйти из аккаунта
              </button>
            </>
          ) : (
            <>
              <span className={`${editDone ? 'profile__error-visable' : 'profile__error'}`}>
                При обновлении профиля произошла ошибка.
              </span>
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
