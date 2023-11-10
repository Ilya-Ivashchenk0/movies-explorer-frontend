import './SearchForm.css'
import { useState, useEffect } from 'react'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import search from '../../images/search-icon.svg'

const SearchForm = ({
    searchMovies,
    setBeginSearch,
    toggleFilterShortMoviesFalse,
    toggleFilterShortMoviesTrue,
    onSearchChange
  }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') // значение 
  const [isFirstSearch, setIsFirstSearch] = useState(true) // состояние первого поиска

  const handleInputFocus = () => { // состояние фокуса поля
    setIsInputFocused(true)
  }

  const handleInputBlur = () => { // состояние когда поле не в фокусе
    setIsInputFocused(false)
  }

  const handleChange = (e) => { // изменение значения в поле
    setSearchQuery(e.target.value)
    onSearchChange(e.target.value)

    if (!isFirstSearch) { // если это не первый поиск, любые изменения в поле запускают поиск автоматически что бы не нажимать кнопку "найти"
      setBeginSearch(true)
      searchMovies()
    }
  }

  const handleSubmit = (e) => { // сабмит формы поиска
    e.preventDefault()
    setBeginSearch(true)
    searchMovies()
    setIsFirstSearch(false)
  }

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
    <form className='search-form' onSubmit={handleSubmit}>
      <div className={`search-form__panel ${isInputFocused ? 'search-form__panel_type_focused' : ''}`}>
        <img className='search-form__icon' src={search} alt='Иконка поиска' />
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleChange}
          value={searchQuery}
          autoComplete='off'
          name='movie'
          className='search-form__input'
          type='text'
          placeholder='Фильм'
        />
        <button className='search-form__button hover-element' type='submit'>Найти</button>
        {windowWidth >= 768 && (<FilterCheckbox
          toggleFilterShortMoviesFalse={toggleFilterShortMoviesFalse}
          toggleFilterShortMoviesTrue={toggleFilterShortMoviesTrue}
        />)}
      </div>
      {windowWidth <= 767 && (<FilterCheckbox
        toggleFilterShortMoviesFalse={toggleFilterShortMoviesFalse}
        toggleFilterShortMoviesTrue={toggleFilterShortMoviesTrue}
      />)}
      <div className='search-form__line' />
    </form>
  )
}

export default SearchForm
