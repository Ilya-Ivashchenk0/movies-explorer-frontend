const { baseUrl } = require('./checkProd')

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, email })
    })
      .then(this._getResponseData)
  }

}

export const mainApi = new MainApi({
  baseUrl: baseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
})