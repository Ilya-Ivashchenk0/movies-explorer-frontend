import './MoviesCard.css'
import { useLocation } from 'react-router-dom'
import voidHeart from '../../images/void-heart.svg'
import fullHeart from '../../images/full-heart.svg'

const MoviesCard = ({ movie }) => {
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
    if (location.pathname === '/movies') {
      return voidHeart
    } else {
      return fullHeart
    }
  }

  return (
    <li className='movies-card'>
      <img onClick={trailerWatch} className='movies-card__img' src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
      <div className='movies-card__board'>
        <h2 className='movies-card__name'>{ movie.nameRU }</h2>
        <button className='movies-card__button hover-element' type='button'><img className='movies-card__icon' src={icon()} alt='Иконка лайка' /></button>
      </div>
      <p className='movies-card__time'>{ convertDuration() }</p>
    </li>
  )
}

export default MoviesCard

// country,
// created_at,
// description,
// director,
// duration,
// id,
// image,
// nameEN,
// nameRU,
// trailerLink,
// updated_at,
// year