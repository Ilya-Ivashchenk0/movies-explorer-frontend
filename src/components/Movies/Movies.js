import './Movies.css'
import Header from '../Header/Header'
import SearchForm from './SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import MoreMovies from './MoreMovies/MoreMovies'
import Footer from '../Footer/Footer'

function Movies() {
  return (
    <div className='movies'>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <MoreMovies />
      <Footer />
    </div>
  )
}

export default Movies
