import './SearchForm.css'
import { useState, useEffect } from 'react'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import search from '../../../images/search-icon.svg'

function SearchForm() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => { // обработчик изменения размера окна
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize) // добавляем слушатель события при монтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize) // убираем слушатель события при размонтировании компонента
    }
  }, [])

  return (
    <section className="search-form">
      {windowWidth >= 768 ? (
        <>
          <div className="search-form__panel">
            <img className="search-form__icon" src={search} alt="search-icon" />
            <input className="search-form__input" type="text" placeholder="Фильм" />
            <button className="search-form__button hover-element-button">Найти</button>
            <FilterCheckbox />
          </div>
          <div className="search-form__line" />
        </>
      ) : (
        <>
          <div className="search-form__panel">
            <input className="search-form__input" type="text" placeholder="Фильм" />
            <button className="search-form__button hover-element-button">Найти</button>
          </div>
          <FilterCheckbox />
          <div className="search-form__line" />
        </>
      )}
    </section>
  )
}

export default SearchForm
