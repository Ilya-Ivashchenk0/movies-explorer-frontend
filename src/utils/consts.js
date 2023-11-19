const consts = {
  LOAD_MOVIES_ERROR_MESSAGE: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  NOT_FOUND_MESSAGE: 'Ничего не найдено',
  NOT_SAVED_MOVIES_MESSAGE: 'У вас пока нет сохраненных фильмов.',
  SUCCESS_UPDATE_MESSAGE: 'Обновление профиля прошло успешно!',
  FAILED_UPDATE_MESSAGE: 'При обновлении профиля произошла ошибка.',
  DURATION_SHORT_FILMS: 40,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  FAILED_SIGNIN_MESSAGE: 'Пользователь с указанными логином и паролем не найден.',
  FAILED_SIGNUP_MESSAGE: 'Пользователь с таким email уже существует.',
  MOVIES_LENGTH: (w) => w <= 767 ? 5 : w >= 768 && w <= 1279 ? 8 : 16,
  MOVIES_TO_ADD: (w) => w <= 1280 ? 2 : 4,
  SMALL: 767,
  SMALL_PLUS: 768,
  DESKTOP: 1280
}

export default consts