import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom' //, useNavigate
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { WindowWidthContext } from '../contexts/WindowWidthContext'
import { authorize } from '../utils/auth'
import { mainApi } from '../utils/MainApi'
import consts from '../utils/consts'
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth) // размер экрана
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' }) // стейт пользователя
  const [loggedIn, setLoggedIn] = useState(false) // состояние авторизации
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true) // состояние загрузки роутов
  const [isOpenNavTab, setIsOpenNavTab] = useState(false) // состояние открытия бокового меню
  const [notification, setNotification] = useState('') // уведомления

  const [movies, setMovies] = useState([]) // фильмы
  const [savedMovies, setSavedMovies] = useState([]) // сохраненные фильмы

  const checkToken = () => {
    authorize()
      .then((res) => {
        setLoggedIn(true)
        setCurrentUser(res.data)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoadingRoutes(false))
  }

  const toggleNavTab = () => { // открытие и закрытие бокового меню
    setIsOpenNavTab(!isOpenNavTab)
  }

  const searchFilter = (movies, searchQuery) => {
    if (!searchQuery.trim()) { // если в поисковой строке
      return movies
    }

    const ruMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) // фильтрация поиска по ключевому слову на русском
    const enMovies = movies.filter((movie) => movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())) // фильтрация поиска по ключевому слову на английском

    const mergedMovies = [...ruMovies, ...enMovies] // совмещаем оба массива

    const uniqueMovies = mergedMovies.filter( // удаляем дубли по индексу
      (movie, index, self) =>
        index === self.findIndex((m) => location.pathname === '/movies' ? m.id === movie.id : m.movieId === movie.movieId)
    )

    return uniqueMovies
  }

  useEffect(() => { // проверка токена при загрузке страницы
    checkToken()
  }, [])

  useEffect(() => {  // загрузка сохраненных фильмов
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then(savedMovies => setSavedMovies(savedMovies))
        .catch(err => {
          console.log(err)
          setNotification(consts.loadMoviesErrorMessage)
        })
    }
  }, [loggedIn])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth) // обработчик изменения размера окна
    window.addEventListener('resize', handleResize) // добавляем слушатель события при монтировании компонента
    return () => window.removeEventListener('resize', handleResize) // убираем слушатель события при размонтировании компонента
  }, [])

  if (isLoadingRoutes) {
    return (<Preloader />)
  }

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
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
            <Route
              path='/movies'
              element={
                <ProtectedRoute
                  element={
                    <Movies
                      movies={movies}
                      setMovies={setMovies}
                      savedMovies={savedMovies}
                      setSavedMovies={setSavedMovies}
                      notification={notification}
                      setNotification={setNotification}
                    />
                  }
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={
                    <SavedMovies
                      movies={movies}
                      setMovies={setMovies}
                      savedMovies={savedMovies}
                      setSavedMovies={setSavedMovies}
                      notification={notification}
                      setNotification={setNotification}
                    />
                  }
                  loggedIn={loggedIn}
                />
              }
            />
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
    </WindowWidthContext.Provider>
  )
}

export default App