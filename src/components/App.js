import './App.css'
import { Route, Routes } from 'react-router-dom' // , useNavigate, useLocation
import Main from './Main/Main'
import Login from './Login/Login'
import Register from './Register/Register'
import Movies from './Movies/Movies'
import SavedMovies from './SavedMovies/SavedMovies'
import Profile from './Profile/Profile'
// import NotFound from './NotFound/NotFound'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
