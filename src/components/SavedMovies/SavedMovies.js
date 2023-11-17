import './SavedMovies.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import consts from '../../utils/consts'
import { searchFilter } from '../../utils/tools'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoreMovies from '../MoreMovies/MoreMovies'

const SavedMovies = ({
  savedMovies,
  setSavedMovies
}) => {
  const location = useLocation()

  const [notification, setNotification] = useState('') // уведомления
  const [searchResults, setSearchResults] = useState([]) // найденные по запросу фильмы
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false) // включена ли фильтрация?
  const [searchQuery, setSearchQuery] = useState('') // посковой запрос

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const searchMovies = () => {
    const results = searchFilter(savedMovies, searchQuery, location.pathname)

    localStorage.removeItem('savedSearchResultsSaved')

    if (results.length < 1) {
      setNotification(consts.NOT_FOUND_MESSAGE)
    } else {
      setNotification('')
    }
    if (savedMovies.length < 1) {
      setNotification(consts.NOT_SAVED_MOVIES_MESSAGE)
    }
    setSearchResults(results)
    localStorage.setItem('savedSearchResultsSaved', JSON.stringify({ searchQuery, isFilterShortMovies, searchResults: results })) // сохраняем запрос с результатами локально
  }

  useEffect(() => {
    const localResults = JSON.parse(localStorage.getItem('savedSearchResultsSaved'))

    if (localResults) {
      setSearchResults(localResults.searchResults)
      setSearchQuery(localResults.searchQuery)
      setIsFilterShortMovies(localResults.isFilterShortMovies)
      if (localResults.searchResults.length < 1) {
        setNotification(consts.NOT_FOUND_MESSAGE)
      }
      if (savedMovies.length < 1) {
        setNotification(consts.NOT_SAVED_MOVIES_MESSAGE)
        setSearchResults(savedMovies)
      }
    } else {
      setSearchResults(savedMovies)
    }
  }, [savedMovies])

  useEffect(() => {
    if (searchResults.length === 0) {
      localStorage.removeItem('savedSearchResultsSaved')
    }
  }, [searchResults])

  return (
    <main className='saved-movies'>
      <SearchForm
        searchMovies={searchMovies}
        setIsFilterShortMovies={setIsFilterShortMovies}
        onSearchChange={handleSearchChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
        isFilterShortMovies={isFilterShortMovies}
        notification={notification}
      />
      <MoreMovies />
    </main>
  )
}

export default SavedMovies
