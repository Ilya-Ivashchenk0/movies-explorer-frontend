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
  
}

export const api = new MainApi({
  baseUrl: baseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
})