import './SearchForm.css'
import React, { useState } from 'react'
import { WindowWidthContext } from '../../contexts/WindowWidthContext'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import search from '../../images/search-icon.svg'
import { setStorageItem } from '../../utils/localStorage'

const SearchForm = ({
  searchMovies,
  isFilterShortMovies,
  setIsFilterShortMovies,
  searchQuery,
  setSearchQuery
}) => {
  const windowWidth = React.useContext(WindowWidthContext)

  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleInputFocus = () => { // состояние фокуса поля
    setIsInputFocused(true)
  }

  const handleInputBlur = () => { // состояние когда поле не в фокусе
    setIsInputFocused(false)
  }

  const handleChange = (e) => { // изменение значения в поле
    setSearchQuery(e.target.value)
    setStorageItem('searchQuery', e.target.value)
  }

  const handleSubmit = (e) => { // сабмит формы поиска
    e.preventDefault()
    searchMovies()
  }

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
        {windowWidth >= 768 && (<FilterCheckbox isFilterShortMovies={isFilterShortMovies} setIsFilterShortMovies={setIsFilterShortMovies} />)}
      </div>
      {windowWidth <= 767 && (<FilterCheckbox isFilterShortMovies={isFilterShortMovies} setIsFilterShortMovies={setIsFilterShortMovies} />)}
      <div className='search-form__line' />
    </form>
  )
}

export default SearchForm
