import './AboutMe.css'
import avatar from '../../../images/avatar.png'

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__block'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Виталий</h3>
          <h4 className='about-me__profession'>Фронтенд-разработчик, 30 лет</h4>
          <p className='about-me__about'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className='about-me__git hover-element' href='https://github.com' target='blank'>Github</a>
        </div>
        <img className='about-me__avatar' src={avatar} alt='Аватар автора' />
      </div>
    </section>
  )
}

export default AboutMe
