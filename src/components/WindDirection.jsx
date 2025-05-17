import { FaArrowUp } from 'react-icons/fa'
import './WindDirection.css'

const WindDirection = ({ direction }) => {
  // Calcule la rotation de la flèche en fonction de la direction du vent
  // En météorologie, la direction du vent est indiquée comme la direction d'où souffle le vent.
  // 0° = Nord, 90° = Est, 180° = Sud, 270° = Ouest
  const arrowStyle = {
    transform: `rotate(${direction}deg)`
  }

  return (
    <div className="wind-direction">
      <div className="arrow-container" style={arrowStyle}>
        <FaArrowUp size={24} />
      </div>
    </div>
  )
}

export default WindDirection