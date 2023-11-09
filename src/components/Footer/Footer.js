import './Footer.css'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='footer'>
      <p className='footer__heading'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__copyright'>© {year}</p>
        <ul className='footer__links'>
          <li className='footer__link-element'><a href='https://practicum.yandex.ru' target='blank' className='footer__link hover-element-link'>Яндекс.Практикум</a></li>
          <li className='footer__link-element'><a href='https://github.com' target='blank' className='footer__link hover-element-link'>Github</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
