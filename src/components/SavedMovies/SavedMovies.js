import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import VoidBlock from './VoidBlock/VoidBlock'

const SavedMovies = () => {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
      <VoidBlock />
    </main>
  )
}

export default SavedMovies
