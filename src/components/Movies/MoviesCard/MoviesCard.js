import './MoviesCard.css'
import voidHeart from '../../../images/void-heart.svg'
import fullHeart from '../../../images/full-heart.svg'

function MoviesCard({ img, name, time }) {
  return (
    <article className='movies-card'>
      <img className='movies-card__img' src={img} alt="Фото фильма" />
      <div className='movies-card__board'>
        <h4 className='movies-card__name'>{ name }</h4>
        <button className='movies-card__button'><img className='movies-card__icon' src={voidHeart} alt="like icon" /></button>
      </div>
      <p className='movies-card__time'>{ time }</p>
    </article>
  )
}

export default MoviesCard
