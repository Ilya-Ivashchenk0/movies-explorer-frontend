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
  const [visibleMoviesLength, setVisibleMoviesLength] = useState(0) // длина отображающихся фильмов
  const [isLoadingMovies, setIsLoadingMovies] = useState(false) // состояние прелоадера
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false) // включена ли фильтрация?

  const windowWidthControl = (data) => {
    if (data < 1) { // если по ключевому слову ничего не найдено
      setIsMoreMovies(false)
      setNotification(consts.NOT_FOUND_MESSAGE)
    }

    if (data > consts.MOVIES_LENGTH(windowWidth)) {
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
    setIsLoadingMovies(true) // включаем прелоадер
    if (movies.length === 0) { // если это первый поиск
      moviesApi.getMovies() // запрос к api фильмов
        .then(movies => {
          const convertMovies = convertLikedMovies(movies, savedMovies) // добавляем лайки
          setMovies(convertMovies) // сохраняем фильмы с лайками в стейт
          const result = searchFilter(convertMovies, searchQuery, location.pathname) // поисковый фильтр
          windowWidthControl(result.length) // отображение карточек в зависимости от размера окна
          setSearchResults(result) // отправляем фильмы на отображение
          setStorageItem('searchQuery', searchQuery)
          setStorageItem('searchResults', result)
        })
        .catch(() => setNotification(consts.LOAD_MOVIES_ERROR_MESSAGE))
        .finally(() => setIsLoadingMovies(false)) // выключаем прелоадер
    } else { // если это не первый поиск
      const result = searchFilter(movies, searchQuery, location.pathname) // поисковый фильтр
      windowWidthControl(result.length) // отображение карточек в зависимости от размера окна
      localStorage.setItem('savedSearchResults', JSON.stringify({ searchQuery, isFilterShortMovies, searchResults: result })) // сохраняем запрос с результатами локально
      setIsLoadingMovies(false) // выключаем прелоадер
      setSearchResults(result) // отправляем фильмы на отображение
    }
  }

  useEffect(() => {
    const query = getStorageItem('searchQuery')
    if (query) {
      setSearchQuery(query)
    }
    const filterShortMovies = getStorageItem('isFilterShortMovies')
    if (filterShortMovies) {
      setIsFilterShortMovies(filterShortMovies)
    }
    const results = getStorageItem('searchResults')
    if (results) {
      setSearchResults(results)
      windowWidthControl(results.length)
    }
  }, [])

  useEffect(() => {
    setVisibleMoviesLength(consts.MOVIES_LENGTH(windowWidth))
  }, [windowWidth])

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
        visibleMoviesLength={visibleMoviesLength}
        isLoadingMovies={isLoadingMovies}
        isFilterShortMovies={isFilterShortMovies}
        notification={notification}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
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
