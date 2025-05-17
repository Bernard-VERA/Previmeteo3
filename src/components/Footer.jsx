import { useTheme } from '../context/ThemeContext'
import './Footer.css'

const Footer = () => {
  const { theme } = useTheme()

  return (
    <div className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-left-space" ></div>
        <div className="footer-text">
            <p>PréviMétéo - Bernard VERA </p>
            <p>2025 &copy; Tous droits réservés</p>
        </div>
        <div className="footer-right-space" ></div>
      </div>
    </div>
  )
}

export default Footer