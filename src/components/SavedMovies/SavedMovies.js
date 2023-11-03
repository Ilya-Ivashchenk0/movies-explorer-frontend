import './SavedMovies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import VoidBlock from './VoidBlock/VoidBlock'

function SavedMovies() {
  return (
    <div>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <VoidBlock />
      <Footer />
    </div>
  )
}

export default SavedMovies
