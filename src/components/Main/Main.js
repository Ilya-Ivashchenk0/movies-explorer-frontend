import './Main.css'
import { useState } from 'react'
import Header from '../Header/Header'
import Promo from './Promo/Promo'
import Footer from '../Footer/Footer'
import Techs from './Techs/Techs'
import AboutProject from './AboutProject/AboutProject'
import AboutMe from './AboutMe/AboutMe'
import Portfolio from './Portfolio/Portfolio'
import NavTab from '../NavTab/NavTab'

function Main() {
  const [isOpenNavTab, setIsOpenNavTab] = useState(false)

  const toggleNavTab = () => {
    setIsOpenNavTab(!isOpenNavTab)
  }

  return (
    <div className='main'>
      <div className={`${isOpenNavTab ? 'main__overlay' : ''}`}>
        <Header toggleNavTab={toggleNavTab} isOpenNavTab={isOpenNavTab} />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </div>
      <NavTab isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
    </div>
  )
}

export default Main
