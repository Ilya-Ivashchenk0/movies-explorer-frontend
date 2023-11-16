import './SavedMovies.css'
import { useState, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoreMovies from '../MoreMovies/MoreMovies'

const SavedMovies = ({
  savedMovies,
  setSavedMovies,
  searchFilter,
  notification,
  setNotification
}) => {
  const [searchResults, setSearchResults] = useState([]) // найденные по запросу фильмы
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false) // включена ли фильтрация?
  const [searchQuery, setSearchQuery] = useState('') // посковой запрос

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const searchMovies = () => {
    const results = searchFilter(savedMovies, searchQuery)

    if (results.length < 1) {
      setNotification('Ничего не найдено')
      setSearchResults(results)
    } else {
      setSearchResults(results)
    }
  }

  useEffect(() => {
    setSearchResults(savedMovies)
  }, [savedMovies])

  return (
    <main className='saved-movies'>
      <SearchForm
        searchMovies={searchMovies}
        setIsFilterShortMovies={setIsFilterShortMovies}
        onSearchChange={handleSearchChange}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList
        searchResults={searchResults}
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
