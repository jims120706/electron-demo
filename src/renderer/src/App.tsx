import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home/index'
import About from './views/About/index'
import Login from './views/Login/index'

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
