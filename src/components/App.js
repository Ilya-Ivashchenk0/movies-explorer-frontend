import './App.css'
import { Route, Routes } from 'react-router-dom' // , useNavigate, useLocation
// import Footer from './Footer/Footer'
// import Header from './Header/Header'
import Main from './Main/Main'
import Login from './Login/Login'
import Register from './Register/Register'
// import NotFound from './NotFound/NotFound'

function App() {
  return (
    <div className="app">
      <Main />
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<Register />} />
        <Route path="/saved-movies" element={<Register />} />
        <Route path="/profile" element={<Register />} />
      </Routes>

    </div>
  )
}

export default App
