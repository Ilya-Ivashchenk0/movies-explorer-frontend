import './FilterCheckbox.css'
import { useState } from 'react'

function FilterCheckbox() {
  const [short, setShort] = useState(false)

  const toggleCircle = () => {
    setShort(!short)
  }

  const circleClass = short ? 'filter-checkbox__circle filter-checkbox__circle_type_left' : 'filter-checkbox__circle filter-checkbox__circle_type_right'

  return (
    <div className="filter-checkbox hover-element">
      <div className="filter-checkbox__switch" onClick={toggleCircle}>
        <div className={circleClass} />
      </div>
      <p className='filter-checkbox__short'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox
