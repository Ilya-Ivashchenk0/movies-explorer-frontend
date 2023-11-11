import './Movies.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoreMovies from './MoreMovies/MoreMovies'
import { moviesApi } from '../../utils/MoviesApi'

const Movies = () => {
  const location = useLocation()

  const [movies, setMovies] = useState(null) // фильмы
  const [beginSearch, setBeginSearch] = useState(false) // состояние начала поиска
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false) // фильтровать короткометражки?
  const [searchQuery, setSearchQuery] = useState('') // посковой запрос
  const [isMoreMovies, setIsMoreMovies] = useState(false) // есть ли еще фильмы по запросу?
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [visibleMovies, setVisibleMovies] = useState(16)
  const [notification, setNotification] = useState('')

  const toggleFilterShortMoviesTrue = () => { // переключение фильтра короткометражек в true
    setIsFilterShortMovies(true)
  }

  const toggleFilterShortMoviesFalse = () => { // переключение фильтра короткометражек в false
    setIsFilterShortMovies(false)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const searchMovies = () => {
    if (location.pathname === '/movies') { // обращаемся к api фильмов, если на странице /movies
      moviesApi.getMovies()
      .then(movies => {
        if (!searchQuery.trim()) { // получаем все фильмы если в поле поиска пусто
          setMovies(movies)
          setIsMoreMovies(true)
          return
        }

        const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) // фильтрация поиска по ключевому слову

        if (filteredMovies.length >= 1) {
          if (filteredMovies.length >= 5) {
            setIsMoreMovies(true)
          } else {
            setIsMoreMovies(false)
          }

          setMovies(filteredMovies)
        } else {
          setIsMoreMovies(false)
          setMovies(null)
          setNotification('Ничего не найдено')
        }
      })
      .catch(err => {
        console.log(err)
        setNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        setMovies(null)
      })
    } else { // обращаемся к своему api, если на странице /saved-movies

    }
  }

  const lengthMovies = () => { // устанавливаем колличество отображаемых фильмов в зависимости от разрешения
    return windowWidth <= 767
    ? 5
    : windowWidth >= 768 && windowWidth <= 1280
    ? 8
    : 16
  }

  const loadMoreMovies = () => {
    if (windowWidth <= 767) { // для брейкпоинта 320px - 767px
      setVisibleMovies(prevVisibleMovies => {
        const nextVisibleMovies = prevVisibleMovies + 2
        setIsMoreMovies(nextVisibleMovies < movies.length) // убираем кнопку еще, когда больше нет фильмов
        return nextVisibleMovies
      })
    } else if (windowWidth >= 768 && windowWidth <= 1280) { // для брейкпоинта 768px - 1280px
      setVisibleMovies(prevVisibleMovies => {
        const nextVisibleMovies = prevVisibleMovies + 4
        setIsMoreMovies(nextVisibleMovies < movies.length) // убираем кнопку еще, когда больше нет фильмов
        return nextVisibleMovies
      })
    } else { // для брейкпоинта 1280px и дальше
      setVisibleMovies(prevVisibleMovies => {
        const nextVisibleMovies = prevVisibleMovies + 4
        setIsMoreMovies(nextVisibleMovies < movies.length) // убираем кнопку еще, когда больше нет фильмов
        return nextVisibleMovies
      })
    }
  }

  useEffect(() => {
    const handleResize = () => { // обработчик изменения размера окна
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize) // добавляем слушатель события при монтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize) // убираем слушатель события при размонтировании компонента
    }
  }, [])

  useEffect(() => {
    if (beginSearch) {
      searchMovies()
    }
    setVisibleMovies(lengthMovies())
  }, [searchQuery, beginSearch, windowWidth])

  return (
    <main className='movies'>
      <SearchForm
        onSearchChange={handleSearchChange}
        searchMovies={searchMovies}
        setBeginSearch={setBeginSearch}
        toggleFilterShortMoviesTrue={toggleFilterShortMoviesTrue}
        toggleFilterShortMoviesFalse={toggleFilterShortMoviesFalse}
      />
      <MoviesCardList
        movies={movies}
        visibleMovies={visibleMovies}
        beginSearch={beginSearch}
        isFilterShortMovies={isFilterShortMovies}
        notification={notification}
      />
      {location.pathname === '/movies' && <MoreMovies isMoreMovies={isMoreMovies} loadMoreMovies={loadMoreMovies} />}
    </main>
  )
}

export default Movies
