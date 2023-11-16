import './MoreMovies.css'
import { useState } from 'react'
import Preloader from '../Preloader/Preloader'
import { useLocation } from 'react-router-dom'

const MoreMovies = ({ isMoreMovies, loadMoreMovies, isLoadingMovies }) => {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const handleButtonClick = () => {
    setLoading(true)

    setTimeout(() => {
      loadMoreMovies()
      setLoading(false)
    }, 500)
  }

  return (
    <section className='more-movies'>
      {location.pathname === 'movies' ? ( <></> ) : (
        isMoreMovies && !isLoadingMovies && (
          loading ? (
            <Preloader />
          ) : (
            <button
              className='more-movies__button hover-element'
              onClick={handleButtonClick}
              type='button'
            >
              Ещё
            </button>
          )
        )
      )}
    </section>
  )
}

export default MoreMovies
