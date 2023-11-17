import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'
import consts from '../../utils/consts'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

const MoviesCardList = ({
  searchResults,
  visibleMoviesLength,
  isFilterShortMovies,
  notification,
  isLoadingMovies,
  savedMovies,
  setSavedMovies
}) => {
  const location = useLocation()

  const filterShortMovies = () => {
    if (isFilterShortMovies) {
      return searchResults.filter(movie => movie.duration > consts.DURATION_SHORT_FILMS)
    }
    return searchResults
  }

  return (
    <section className='movies-card-list'>
      {isLoadingMovies && (
        <Preloader />
      )}
      {searchResults.length > 0 && !isLoadingMovies && (
        <ul className={`movies-card-list__grid ${filterShortMovies().length <= 0 ? 'movies-card-list__grid_void' : ''}`}>
          {filterShortMovies().length > 0 &&
            filterShortMovies().slice(0, visibleMoviesLength).map((movie) => (
              <MoviesCard
                key={(location.pathname === '/movies') ? movie.id : movie.movieId}
                movie={movie}
                searchResults={searchResults}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            ))}
        </ul>
      )}
      {searchResults.length <= 0  && notification && (
        <p className='movies-card-list__not-found'>{ notification }</p>
      )}
    </section>
  )
}

export default MoviesCardList
