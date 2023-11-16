import React, { useCallback } from 'react'

export const useFormValidation = () => {
  const [values, setValues] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [isValid, setIsValid] = React.useState(false)

  const handleChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    setValues({...values, [name]: value})
    setErrors({...errors, [name]: target.validationMessage })
    setIsValid(target.closest("form").checkValidity())
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return { values, handleChange, errors, isValid, resetForm }
}

export const searchFilter = (movies, searchQuery, locationPathname) => {
  if (!searchQuery.trim()) { // если в поисковой строке
    return movies
  }

  // фильтрация поиска по ключевому слову на русском
  const ruMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()))

  // фильтрация поиска по ключевому слову на английском
  const enMovies = movies.filter((movie) => movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()))

  const mergedMovies = [...ruMovies, ...enMovies] // совмещаем оба массива

  const uniqueMovies = mergedMovies.filter( // удаляем дубли по индексу
    (movie, index, self) =>
      index === self.findIndex((m) => locationPathname === '/movies' ? m.id === movie.id : m.movieId === movie.movieId)
  )

  return uniqueMovies
}

export const convertLikedMovies = (movies, savedMovies) => { // сравниваем фильмы с сохраненными фильмами, добавляем лайк и id
  const convertMovies = movies.map(movie => { // проходим по каждому элементу
    const compareMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.id) // сравниваем id фильма с id сохраненных фильмов
    const isLiked = compareMovie ? true : false // если нашли совпадение, то добавляем isLiked
    const _id = compareMovie ? compareMovie._id : null

    return { ...movie, isLiked, _id } // добавляем фильму isLiked и _id для удаления фильма
  })

  return convertMovies
}

export const lengthMovies = (windowWidth) => { // устанавливаем колличество отображаемых фильмов в зависимости от разрешения
  return windowWidth <= 767
  ? 5
  : windowWidth >= 768 && windowWidth <= 1280
  ? 8
  : 16
}