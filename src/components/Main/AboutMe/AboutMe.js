import './AboutMe.css'
import avatar from '../../../images/avatar.svg'
import arrow from '../../../images/arrow.svg'
import { Link } from 'react-router-dom'

function AboutMe() {
  return (
    <section className='about-me'>
      <h3 className='about-me__title'>Студент</h3>
      <div className='about-me__block'>
        <div className='about-me__info'>
          <h2 className='about-me__name'>Виталий</h2>
          <h4 className='about-me__profession'>Фронтенд-разработчик, 30 лет</h4>
          <p className='about-me__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <p className='about-me__git'>Github</p>
        </div>
        <img className='about-me__avatar' src={avatar} alt="Avatar" />
      </div>
      <div className='about-me__portfolio'>
        <h4 className='about-me__portfolio-title'>Портфолио</h4>
        <ul className='about-me__portfolio-list'>
          <li className='about-me__portfolio-band'>
            <Link className='about-me__portfolio-link' href=''>Статичный сайт</Link>
            <img className='about-me__portfolio-icon' src={arrow} alt="arrow-icon" />
          </li>
          <li className='about-me__portfolio-band'>
            <Link className='about-me__portfolio-link' href=''>Адаптивный сайт</Link>
            <img className='about-me__portfolio-icon' src={arrow} alt="arrow-icon" />
          </li>
          <li className='about-me__portfolio-band about-me__portfolio-band_type_underlined-none'>
            <Link className='about-me__portfolio-link' href=''>Одностраничное приложение</Link>
            <img className='about-me__portfolio-icon' src={arrow} alt="arrow-icon" />
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutMe
