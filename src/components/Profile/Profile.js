import './Profile.css'
import Header from '../Header/Header'

function Profile() {
  return (
    <div className='profile'>
      <Header />
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
      <button className='profile__edit-button'>Редактировать</button>
      <button className='profile__signout-button'>Выйти из аккаунта</button>
    </div>
  )
}

export default Profile
