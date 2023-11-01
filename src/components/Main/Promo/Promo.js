import './Promo.css'
import logo from '../../../images/landing-logo.svg'

function Promo() {
  return (
    <div className='promo'>
      <h2 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h2>
      <img src={logo} alt="Логотип промо блока" className="promo__logo" />
    </div>
  )
}

export default Promo
