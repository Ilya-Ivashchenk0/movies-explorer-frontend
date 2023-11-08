import './App.css'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './Header/Header'
import Main from './Main/Main'
import Login from './Login/Login'
import Register from './Register/Register'
import Movies from './Movies/Movies'
import SavedMovies from './SavedMovies/SavedMovies'
import Profile from './Profile/Profile'
import NotFound from './NotFound/NotFound'
import NavTab from './NavTab/NavTab'
import Footer from './Footer/Footer'

function App() {
  const location = useLocation()

  const [isOpenNavTab, setIsOpenNavTab] = useState(false)

  const isHeader = () => {
    if (
      location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ||
      location.pathname === '/profile'
    ) {
      return true
    } else {
      return false
    }
  }

  const isFooter = () => {
    if (
      location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies'
    ) {
      return true
    } else {
      return false
    }
  }

  const toggleNavTab = () => {
    setIsOpenNavTab(!isOpenNavTab)
  }

  return (
    <div className='app'>
      {isHeader() && (
        <Header toggleNavTab={toggleNavTab} isOpenNavTab={isOpenNavTab} />
      )}
      <div className={`app__overlay ${isOpenNavTab ? 'app__active-overlay' : ''}`} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <NavTab isOpenNavTab={isOpenNavTab} toggleNavTab={toggleNavTab} />
      {isFooter() && (
        <Footer />
      )}
    </div>
  )
}

export default App
