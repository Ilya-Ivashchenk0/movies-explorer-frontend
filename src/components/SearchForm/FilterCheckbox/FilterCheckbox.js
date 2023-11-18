import './FilterCheckbox.css'
import { useLocation } from 'react-router-dom'
import { setStorageItem } from '../../../utils/localStorage'

const FilterCheckbox = ({ isFilterShortMovies, setIsFilterShortMovies }) => {
  const location = useLocation()

  const toggleCircle = () => {
    console.log(111)
    setIsFilterShortMovies(!isFilterShortMovies)
    if (location.pathname === '/movies') {
      setStorageItem('isFilterShortMovies', !isFilterShortMovies)
    }
  }

  return (
    <div className='filter-checkbox hover-element'>
      <div className='filter-checkbox__switch' onClick={toggleCircle}>
        <div className={
          isFilterShortMovies
            ? 'filter-checkbox__circle filter-checkbox__circle_type_right'
            : 'filter-checkbox__circle filter-checkbox__circle_type_left'
          }
        />
      </div>
      <p className='filter-checkbox__short'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox
