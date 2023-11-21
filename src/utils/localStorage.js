export const setStorageItem = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data))
}

export const getStorageItem = (name) => {
  const data = JSON.parse(localStorage.getItem(name))
  return data
}

export const deleteAllStorage = () => {
  localStorage.clear()
}