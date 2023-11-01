import './Portfolio.css'
import { Link } from 'react-router-dom'
import arrow from '../../../images/arrow.svg'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__band'>
          <Link className='portfolio__link' to='/'>Статичный сайт
            <img className='portfolio__icon' src={arrow} alt="arrow__icon" />
          </Link>
        </li>
        <li className='portfolio__band'>
          <Link className='portfolio__link' to='/'>Адаптивный сайт
            <img className='portfolio__icon' src={arrow} alt="arrow__icon" />
          </Link>
        </li>
        <li className='portfolio__band portfolio__band_type_underlined-none'>
          <Link className='portfolio__link' to='/'>Одностраничное приложение
            <img className='portfolio__icon' src={arrow} alt="arrow__icon" />
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
