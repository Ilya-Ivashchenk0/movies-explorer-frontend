import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import film1 from '../../images/film-1.png'
import film2 from '../../images/film-2.png'
import film3 from '../../images/film-3.png'
import film4 from '../../images/film-4.png'
import film5 from '../../images/film-5.png'
import film6 from '../../images/film-6.png'
import film7 from '../../images/film-7.png'
import film8 from '../../images/film-8.png'
import film9 from '../../images/film-9.png'
import film10 from '../../images/film-10.png'
import film11 from '../../images/film-11.png'
import film12 from '../../images/film-12.png'
import film13 from '../../images/film-13.png'
import film14 from '../../images/film-14.png'
import film15 from '../../images/film-15.png'
import film16 from '../../images/film-16.png'

function MoviesCardList() {
  const location = useLocation()

  const cards = () => {
    if (location.pathname === '/movies') {
      return [
        {id: 1, img: film1, name: '33 слова о дизайне', time: '1ч 42м'},
        {id: 2, img: film2, name: 'Киноальманах «100 лет дизайна»', time: '1ч 42м'},
        {id: 3, img: film3, name: 'В погоне за Бенкси', time: '1ч 42м'},
        {id: 4, img: film4, name: 'Баския: Взрыв реальности', time: '1ч 42м'},
        {id: 5, img: film5, name: 'Бег это свобода', time: '1ч 42м'},
        {id: 6, img: film6, name: 'Книготорговцы', time: '1ч 42м'},
        {id: 7, img: film7, name: 'Когда я думаю о Германии ночью', time: '1ч 42м'},
        {id: 8, img: film8, name: 'Gimme Danger: История Игги и The Stooges', time: '1ч 42м'},
        {id: 9, img: film9, name: 'Дженис: Маленькая девочка грустит', time: '1ч 42м'},
        {id: 10, img: film10, name: 'Соберись перед прыжком', time: '1ч 42м'},
        {id: 11, img: film11, name: 'Пи Джей Харви: A dog called money', time: '1ч 42м'},
        {id: 12, img: film12, name: 'По волнам: Искусство звука в кино', time: '1ч 42м'},
        {id: 13, img: film13, name: 'Рудбой', time: '1ч 42м'},
        {id: 14, img: film14, name: 'Скейт — кухня', time: '1ч 42м'},
        {id: 15, img: film15, name: 'Война искусств', time: '1ч 42м'},
        {id: 16, img: film16, name: 'Зона', time: '1ч 42м'}
      ]
    } else {
      return [
        {id: 1, img: film1, name: '33 слова о дизайне', time: '1ч 42м'},
        {id: 2, img: film2, name: 'Киноальманах «100 лет дизайна»', time: '1ч 42м'},
        {id: 3, img: film3, name: 'В погоне за Бенкси', time: '1ч 42м'}
      ]
    }
  }

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__grid'>
        {cards().map((card) => (
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
