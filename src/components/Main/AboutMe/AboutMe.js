import './AboutMe.css'
import avatar from '../../../images/avatar.jpg'

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__block'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Илья</h3>
          <h4 className='about-me__profession'>Фронтенд-разработчик, 27 лет</h4>
          <p className='about-me__about'>Я родился в Краснодаре, но 1.5 года назад переехал в Санкт-Петербург. Закончил факультет Природообустройства и Водопользования в КубГАУ. Начал свой путь в вебе примерно 2 года назад.</p>
          <a className='about-me__git hover-element' href='https://github.com/Ilya-Ivashchenk0' target='blank'>Github</a>
        </div>
        <img className='about-me__avatar' src={avatar} alt='Аватар автора' />
      </div>
    </section>
  )
}

export default AboutMe
