import './MoreMovies.css'
import { useState } from 'react'
import Preloader from '../../Preloader/Preloader'

const MoreMovies = ({ isMoreMovies, loadMoreMovies }) => {
  const [loading, setLoading] = useState(false)

  const handleButtonClick = () => {
    setLoading(true)

    setTimeout(() => {
      loadMoreMovies()
      setLoading(false)
    }, 3000)
  }


  return (
    <section className='more-movies'>
      {isMoreMovies && (
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
      )}
    </section>
  )
}

export default MoreMovies
