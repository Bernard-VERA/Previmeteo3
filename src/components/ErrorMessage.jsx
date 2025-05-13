import { FaExclamationTriangle } from 'react-icons/fa'
import './ErrorMessage.css'

const ErrorMessage = ({ message }) => {
  if (!message) return null
  
  return (
    <div className="error-container fade-in">
      <div className="error-icon">
        <FaExclamationTriangle />
      </div>
      <p className="error-message">{message}</p>
    </div>
  )
}

export default ErrorMessage