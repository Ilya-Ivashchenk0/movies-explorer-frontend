import './Movies.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoreMovies from './MoreMovies/MoreMovies'
import { moviesApi } from '../../utils/MoviesApi'

const Movies = () => {
  const location = useLocation()

  const [movies, setMovies] = useState(null)
  const [beginSearch, setBeginSearch] = useState(false)
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMoreMovies, setIsMoreMovies] = useState(false)

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
    moviesApi.getMovies()
      .then(movies => {
        if (!searchQuery.trim()) { // получаем все фильмы если в поле поиска пусто
          setMovies(movies)
          return
        }

        if (movies) {
          const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()))
          setMovies(filteredMovies)
        } else {
          setMovies(null)
        }
      })
      .catch(err => {
        console.log(err)
        setMovies(null) // Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.
      })
  }

  useEffect(() => {
    if (beginSearch) {
      searchMovies()
    }
  }, [searchQuery, beginSearch])

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
        beginSearch={beginSearch}
        isFilterShortMovies={isFilterShortMovies}
      />
      {location.pathname === '/movies' && isMoreMovies && <MoreMovies />}
    </main>
  )
}

export default Movies
