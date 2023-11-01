import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__heading'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__copyright'>© 2020</p>
        <div className='footer__links'>
          <Link to='/' className='footer__link'>Яндекс.Практикум</Link>
          <Link to='/' className='footer__link'>Github</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
