import consts from "./consts"

export const searchFilter = (movies, searchQuery, isFilterShortMovies, locationPathname) => {
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

  if (isFilterShortMovies) {
    const filterData = uniqueMovies.filter(movie => movie.duration <= consts.DURATION_SHORT_FILMS)
    return filterData
  }

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
