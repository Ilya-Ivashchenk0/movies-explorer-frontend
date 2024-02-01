import './Movies.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import consts from '../../utils/consts'
import { WindowWidthContext } from '../../contexts/WindowWidthContext'
import { moviesApi } from '../../utils/MoviesApi'
import { searchFilter, convertLikedMovies } from '../../utils/tools'
import { setStorageItem, getStorageItem } from '../../utils/localStorage'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoreMovies from '../MoreMovies/MoreMovies'

const Movies = ({
  movies,
  setMovies,
  savedMovies,
  setSavedMovies,
  notification,
  setNotification
}) => {
  const location = useLocation()
  const windowWidth = React.useContext(WindowWidthContext)

  const [searchQuery, setSearchQuery] = useState('') // посковой запрос
  const [searchResults, setSearchResults] = useState([]) // найденные по запросу фильмы
  const [isMoreMovies, setIsMoreMovies] = useState(false) // есть ли еще фильмы по запросу?
  const [visibleMoviesLength, setVisibleMoviesLength] = useState(consts.MOVIES_LENGTH(windowWidth)) // длина отображающихся фильмов
  const [isLoadingMovies, setIsLoadingMovies] = useState(false) // состояние прелоадера
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false) // включена ли фильтрация?

  const windowWidthControl = (data) => {
    if (data.length > visibleMoviesLength) {
      setIsMoreMovies(true)
    } else {
      setIsMoreMovies(false)
    }
  }

  const loadMoreMovies = () => {
    const nextMovies = visibleMoviesLength + consts.MOVIES_TO_ADD(windowWidth)

    if (searchResults.length > nextMovies) {
      setVisibleMoviesLength(nextMovies)
      setIsMoreMovies(true)
    } else if (searchResults.length === nextMovies) {
      setVisibleMoviesLength(nextMovies)
      setIsMoreMovies(false)
    } else {
      setVisibleMoviesLength(searchResults.length)
      setIsMoreMovies(false)
    }
  }

  const searchMovies = () => { // функция поиска фильмов
    setVisibleMoviesLength(consts.MOVIES_LENGTH(windowWidth))
    const localMovies = getStorageItem('movies')

    if (localMovies) { // если это не первый поиск
      const filterResult = searchFilter(localMovies, searchQuery, isFilterShortMovies, location.pathname) // поисковый фильтр
      if (filterResult.length < 1) {
        setIsMoreMovies(false)
        setNotification(consts.NOT_FOUND_MESSAGE)
      }
      setSearchResults(filterResult)
      windowWidthControl(filterResult)
    } else { // если это первый поиск и в локал нет фильмов
      moviesApi.getMovies() // запрос к api фильмов
        .then(movies => {
          const convertMovies = convertLikedMovies(movies, savedMovies) // добавляем лайки
          setMovies(convertMovies) // сохраняем фильмы с лайками в стейт
          setStorageItem('movies', convertMovies)
          const filterResult = searchFilter(convertMovies, searchQuery, isFilterShortMovies, location.pathname)
          setSearchResults(filterResult)
          windowWidthControl(filterResult)
        })
        .catch(() => setNotification(consts.LOAD_MOVIES_ERROR_MESSAGE))
        .finally(() => setIsLoadingMovies(false)) // выключаем прелоадер
    }
  }

  useEffect(() => {
    const query = getStorageItem('searchQuery')

    const checkQuery = () => {
      if (!query) {
        setSearchQuery('')
        return ''
      } else {
        setSearchQuery(query)
        return query
      }
    }

    const filterShortMovies = getStorageItem('isFilterShortMovies')

    const checkFilterShortMovies = () => {
      if (filterShortMovies) {
        setIsFilterShortMovies(filterShortMovies)
        return filterShortMovies
      } else {
        return false
      }
    }

    const localMovies = getStorageItem('movies')

    if (localMovies) {
      setMovies(localMovies)
      const filterResult = searchFilter(localMovies, checkQuery(), checkFilterShortMovies(), location.pathname) // поисковый фильтр

      if (filterResult.length < 1) {
        setNotification(consts.NOT_FOUND_MESSAGE)
      }
      setSearchResults(filterResult)
      windowWidthControl(filterResult)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterShortMovies])

  useEffect(() => {
    setVisibleMoviesLength(consts.MOVIES_LENGTH(windowWidth))
  }, [windowWidth, isFilterShortMovies])

  return (
    <main className='movies'>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchMovies={searchMovies}
        isFilterShortMovies={isFilterShortMovies}
        setIsFilterShortMovies={setIsFilterShortMovies}
      />
      <MoviesCardList
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        visibleMoviesLength={visibleMoviesLength}
        isLoadingMovies={isLoadingMovies}
        isFilterShortMovies={isFilterShortMovies}
        notification={notification}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
        windowWidthControl={windowWidthControl}
        setVisibleMoviesLength={setVisibleMoviesLength}
        movies={movies}
      />
      {location.pathname === '/movies' &&
        <MoreMovies
          isMoreMovies={isMoreMovies}
          loadMoreMovies={loadMoreMovies}
          isLoadingMovies={isLoadingMovies}
        />
      }
    </main>
  )
}

export default Movies
