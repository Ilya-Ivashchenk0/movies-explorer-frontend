import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import VoidBlock from './VoidBlock/VoidBlock'

function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
      <VoidBlock />
    </main>
  )
}

export default SavedMovies
