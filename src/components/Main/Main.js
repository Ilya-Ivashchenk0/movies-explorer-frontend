import './Main.css'
import Promo from './Promo/Promo'
import Footer from '../Footer/Footer'
import Techs from './Techs/Techs'
import AboutProject from './AboutProject/AboutProject'
import AboutMe from './AboutMe/AboutMe'
import Portfolio from './Portfolio/Portfolio'

function Main() {
  return (
    <div className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  )
}

export default Main
