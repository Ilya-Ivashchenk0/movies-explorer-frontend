export const baseUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    return `http://localhost:3500`
  } else {
    return `https://movies-explorer-api.test-tasks.ru`
  }
}