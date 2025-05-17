import { useTheme } from '../context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <h1 className="navbar-logo">PréviMétéo</h1>
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
        >
          {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar