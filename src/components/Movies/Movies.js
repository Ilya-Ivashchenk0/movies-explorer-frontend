import './Movies.css'
import { useState } from 'react'
import Header from '../Header/Header'
import SearchForm from './SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import MoreMovies from './MoreMovies/MoreMovies'
import Footer from '../Footer/Footer'
import NavTab from '../NavTab/NavTab'

function Movies() {
  const [isOpenNavTab, setIsOpenNavTab] = useState(false)

  const toggleNavTab = () => {
    setIsOpenNavTab(!isOpenNavTab)
  }

  return (
    <div className='movies'>
      <div className={`${isOpenNavTab ? 'movies__overlay' : ''}`}>
        <Header isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
        <SearchForm />
        <MoviesCardList />
        <MoreMovies />
        <Footer />
      </div>
      <NavTab isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
    </div>
  )
}

export default Movies
