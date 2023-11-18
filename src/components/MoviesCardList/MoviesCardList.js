import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

const MoviesCardList = ({
  searchResults,
  visibleMoviesLength,
  notification,
  isLoadingMovies,
  savedMovies,
  setSavedMovies,
  movies
}) => {
  const location = useLocation()

  return (
    <section className='movies-card-list'>
      {isLoadingMovies && (
        <Preloader />
      )}
      {searchResults.length > 0 && !isLoadingMovies && (
        <ul className={`movies-card-list__grid ${searchResults.length <= 0 ? 'movies-card-list__grid_void' : ''}`}>
          {searchResults.slice(0, visibleMoviesLength).map((movie) => (
              <MoviesCard
                key={(location.pathname === '/movies') ? movie.id : movie.movieId}
                movie={movie}
                searchResults={searchResults}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                movies={movies}
              />
          ))}
        </ul>
      )}
      {searchResults.length <= 0 && (
        <p className='movies-card-list__not-found'>{ notification }</p>
      )}
    </section>
  )
}

export default MoviesCardList
