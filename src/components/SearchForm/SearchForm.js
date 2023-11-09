import './SearchForm.css'
import { useState, useEffect } from 'react'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import search from '../../images/search-icon.svg'

const SearchForm = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isInputFocused, setIsInputFocused] = useState(false)

  useEffect(() => {
    const handleResize = () => { // обработчик изменения размера окна
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize) // добавляем слушатель события при монтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize) // убираем слушатель события при размонтировании компонента
    }
  }, [])

  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)
  }

  return (
    <form className='search-form'>
      <div className={`search-form__panel ${isInputFocused ? 'search-form__panel_type_focused' : ''}`}>
        <img className='search-form__icon' src={search} alt='Иконка поиска' />
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          name='movie'
          className='search-form__input'
          type='text'
          placeholder='Фильм'
          required
        />
        <button className='search-form__button hover-element' type='submit'>Найти</button>
        {windowWidth >= 768 && (<FilterCheckbox />)}
      </div>
      {windowWidth <= 767 && (<FilterCheckbox />)}
      <div className='search-form__line' />
    </form>
  )
}

export default SearchForm
