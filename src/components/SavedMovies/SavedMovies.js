import './SavedMovies.css'
import { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import VoidBlock from './VoidBlock/VoidBlock'
import NavTab from '../NavTab/NavTab'

function SavedMovies() {
  const [isOpenNavTab, setIsOpenNavTab] = useState(false)

  const toggleNavTab = () => {
    setIsOpenNavTab(!isOpenNavTab)
  }

  return (
    <div className='saved-movies'>
      <div className={`${isOpenNavTab ? 'saved-movies__overlay' : ''}`}>
        <Header isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
        <SearchForm />
        <MoviesCardList />
        <VoidBlock />
        <Footer />
      </div>
      <NavTab isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
    </div>
  )
}

export default SavedMovies
