import './MoviesCard.css'
import { useLocation } from 'react-router-dom'
import voidHeart from '../../images/void-heart.svg'
import fullHeart from '../../images/full-heart.svg'
import deleteIcon from '../../images/delete-icon.svg'
import { mainApi } from '../../utils/MainApi'

const MoviesCard = ({ movie, savedMovies, setSavedMovies }) => {
  const location = useLocation()

  const convertDuration = () => {
    const hours = Math.floor(movie.duration / 60)
    const remainingMinutes = movie.duration % 60

    if (hours === 0) {
      return `${movie.duration}м`
    }

    return `${hours}ч ${remainingMinutes}м`
  }

  const trailerWatch = () => {
    window.open(movie.trailerLink, 'blank')
  }

  const icon = () => {
    if (location.pathname === '/movies') { //fullHeart
      if (movie.isLiked) {
        return fullHeart
      }
      return voidHeart
    } else {
      return deleteIcon
    }
  }

  const handleAddLike = () => {
    mainApi.addLike({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    })
      .then(newMovie => {
        setSavedMovies([...savedMovies, newMovie])
        movie.isLiked = true
        movie._id = newMovie._id
      })
  }

  const handleDeleteLike = () => {
    mainApi.deleteLike(movie._id)
      .then(message => {
        setSavedMovies(savedMovies.filter(savedMovie => savedMovie._id !== movie._id))
        movie.isLiked = false
      })
  }

  return (
    <li className='movies-card'>
      <img onClick={trailerWatch} className='movies-card__img' src={location.pathname === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={movie.nameRU} />
      <div className='movies-card__board'>
        <h2 className='movies-card__name'>{ movie.nameRU }</h2>
        <button onClick={location.pathname === '/movies' ? (movie.isLiked ? handleDeleteLike : handleAddLike) : handleDeleteLike} className='movies-card__button hover-element' type='button'><img className='movies-card__icon' src={icon()} alt='Иконка лайка' /></button>
      </div>
      <p className='movies-card__time'>{ convertDuration() }</p>
    </li>
  )
}

export default MoviesCard
