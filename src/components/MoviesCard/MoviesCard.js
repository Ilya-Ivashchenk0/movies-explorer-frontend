import './MoviesCard.css'
import { useLocation } from 'react-router-dom'
import voidHeart from '../../images/void-heart.svg'
import fullHeart from '../../images/full-heart.svg'

const MoviesCard = ({ img, name, time }) => {
  const location = useLocation()

  const icon = () => {
    if (location.pathname === '/movies') {
      return voidHeart
    } else {
      return fullHeart
    }
  }

  return (
    <li className='movies-card'>
      <img className='movies-card__img' src={img} alt={name} />
      <div className='movies-card__board'>
        <h2 className='movies-card__name'>{ name }</h2>
        <button className='movies-card__button hover-element' type='button'><img className='movies-card__icon' src={icon()} alt='Иконка лайка' /></button>
      </div>
      <p className='movies-card__time'>{ time }</p>
    </li>
  )
}

export default MoviesCard
