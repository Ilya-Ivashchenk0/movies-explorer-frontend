import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

const MoviesCardList = ({ movies, visibleMovies, beginSearch, isFilterShortMovies, notification }) => {
  const filterShortMovies = () => {
    if (isFilterShortMovies) {
      return movies.filter(movie => movie.duration > 40)
    }

    return movies
  }

  return (
    <section className='movies-card-list'>
      {!movies && beginSearch && !notification && (
        <Preloader />
      )}
      {movies && (
        <ul className={`movies-card-list__grid ${filterShortMovies().length <= 0 ? 'movies-card-list__grid_void' : ''}`}>
          {filterShortMovies().length > 0 && filterShortMovies().slice(0, visibleMovies).map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
      {!movies && notification && (
        <p className='movies-card-list__not-found'>{ notification }</p>
      )}
    </section>
  )
}

export default MoviesCardList
