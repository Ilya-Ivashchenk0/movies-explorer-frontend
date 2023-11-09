import './MoreMovies.css'
import { useState } from 'react'
import Preloader from '../../Preloader/Preloader'

const MoreMovies = () => {
  const [loading, setLoading] = useState(false)

  const handleButtonClick = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }


  return (
    <section className='more-movies'>
      {loading ? (
        <Preloader />
      ) : (
        <button className='more-movies__button hover-element' onClick={handleButtonClick} type='button'>
          Ещё
        </button>
      )}
    </section>
  )
}

export default MoreMovies
