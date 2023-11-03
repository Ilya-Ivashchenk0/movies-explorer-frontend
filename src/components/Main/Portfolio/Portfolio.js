import './Portfolio.css'
import arrow from '../../../images/arrow.svg'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__band'>
          <a className='portfolio__link' href='https://github.com/Ilya-Ivashchenk0/how-to-learn' target="_blank" rel="noreferrer">Статичный сайт
            <img className='portfolio__icon' src={arrow} alt="arrow__icon" />
          </a>
        </li>
        <li className='portfolio__band'>
          <a className='portfolio__link' href='https://github.com/Ilya-Ivashchenk0/yet-another-project' target="_blank" rel="noreferrer">Адаптивный сайт
            <img className='portfolio__icon' src={arrow} alt="arrow__icon" />
          </a>
        </li>
        <li className='portfolio__band portfolio__band_type_underlined-none'>
          <a className='portfolio__link' href='https://github.com/Ilya-Ivashchenk0/mesto' target="_blank" rel="noreferrer">Одностраничное приложение
            <img className='portfolio__icon' src={arrow} alt="arrow__icon" />
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
