import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

const MoviesCardList = ({ movies, beginSearch, isFilterShortMovies }) => {
  const location = useLocation()

  const filterMovies = () => {
    if (!movies) {
      return 'Ничего не найдено'
    }

    if (isFilterShortMovies) {
      return movies.filter(movie => movie.duration > 40)
    }

    return movies
  }

  return (
    <section className='movies-card-list'>
      {!movies && beginSearch && (
        <Preloader />
      )}
      {movies && (
        <ul className={`movies-card-list__grid ${filterMovies().length <= 0 ? 'movies-card-list__grid_void' : ''}`}>
          {filterMovies().length > 0 ? filterMovies().map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          )) : (
            <p className='movies-card-list__not-found'>Ничего не найдено</p>
          )}
        </ul>
      )}
    </section>
  )
}

export default MoviesCardList

  // const cards = () => {
  //   if (location.pathname === '/movies') {
  //     if (window.innerWidth <= 767) {
  //       return [
  //
  //       ]
  //     } else if (window.innerWidth === 768) {
  //       return [
  //
  //       ]
  //     } else {
  //       return [
  //
  //       ]
  //     }
  //   } else {
  //     return [
  //
  //     ]
  //   }
  // }