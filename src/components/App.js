import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom' //, useNavigate
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { authorize } from '../utils/auth'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import Header from './Header/Header'
import Main from './Main/Main'
import Login from './Login/Login'
import Register from './Register/Register'
import Movies from './Movies/Movies'
import SavedMovies from './SavedMovies/SavedMovies'
import Profile from './Profile/Profile'
import NotFound from './NotFound/NotFound'
import NavTab from './NavTab/NavTab'
import Footer from './Footer/Footer'
import Preloader from './Preloader/Preloader'

const App = () => {
  const location = useLocation()
  // const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''})
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true)
  const [isOpenNavTab, setIsOpenNavTab] = useState(false)

  const checkToken = () => {
    authorize()
      .then((res) => {
        setLoggedIn(true)
        setCurrentUser(res.data)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoadingRoutes(false))
  }

  useEffect(() => { // проверка токена при загрузке страницы
    checkToken()
  }, [])

  const toggleNavTab = () => {
    setIsOpenNavTab(!isOpenNavTab)
  }

  if (isLoadingRoutes) {
    return (<Preloader />)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {(
          location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ||
          location.pathname === '/profile'
        ) && (
          <Header toggleNavTab={toggleNavTab} loggedIn={loggedIn} />
        )}
        <div className={`app__overlay ${isOpenNavTab ? 'app__active-overlay' : ''}`} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/signup' element={<Register setLoggedIn={setLoggedIn} />} />
          <Route path='/movies' element={<ProtectedRoute element={<Movies />} loggedIn={loggedIn} />} />
          <Route path='/saved-movies' element={<ProtectedRoute element={<SavedMovies />} loggedIn={loggedIn} />} />
          <Route path='/profile' element={<ProtectedRoute element={<Profile setLoggedIn={setLoggedIn} />} loggedIn={loggedIn} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <NavTab isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
        {(
          location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies'
        ) && (
          <Footer />
        )}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
