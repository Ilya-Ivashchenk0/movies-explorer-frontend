import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import film1 from '../../../images/film-1.svg'
import film2 from '../../../images/film-2.svg'
import film3 from '../../../images/film-3.svg'

function MoviesCardList() {

  const cards = [
    {id: 1, img: film1, name: '33 слова о дизайне', time: '1ч 42м'},
    {id: 2, img: film2, name: 'Киноальманах «100 лет дизайна»', time: '1ч 42м'},
    {id: 3, img: film3, name: 'В погоне за Бенкси', time: '1ч 42м'}
  ]

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__grid'>
        {cards.map((card) => (
          <MoviesCard
            key={card.id}
            img={card.img}
            name={card.name}
            time={card.time}
          />
        ))}
      </div>
    </section>
  )
}

export default MoviesCardList
