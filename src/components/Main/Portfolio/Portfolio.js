import './Portfolio.css'
import arrow from '../../../images/arrow.svg'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__band'>
          <a className='portfolio__link hover-element-link' href='https://github.com/Ilya-Ivashchenk0/how-to-learn' target='blank' rel='noreferrer'>Статичный сайт</a>
          <img className='portfolio__icon' src={arrow} alt='Иконка стрелки' />
        </li>
        <li className='portfolio__band'>
          <a className='portfolio__link hover-element-link' href='https://github.com/Ilya-Ivashchenk0/yet-another-project' target='blank' rel='noreferrer'>Адаптивный сайт</a>
          <img className='portfolio__icon' src={arrow} alt='Иконка стрелки' />
        </li>
        <li className='portfolio__band portfolio__band_type_underlined-none'>
          <a className='portfolio__link hover-element-link' href='https://github.com/Ilya-Ivashchenk0/mesto' target='blank' rel='noreferrer'>Одностраничное приложение</a>
          <img className='portfolio__icon' src={arrow} alt='Иконка стрелки' />
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
