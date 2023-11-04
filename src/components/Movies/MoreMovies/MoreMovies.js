import './MoreMovies.css'
import { useState } from 'react'
import Preloader from '../Preloader/Preloader'

function MoreMovies() {
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
        <button className='more-movies__button hover-element-button' onClick={handleButtonClick}>
          Ещё
        </button>
      )}
    </section>
  )
}

export default MoreMovies
