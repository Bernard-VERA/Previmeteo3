import { FaArrowUp } from 'react-icons/fa'
import './WindDirection.css'

const WindDirection = ({ direction }) => {
  // Calculate rotation based on wind direction
  // In meteorology, wind direction is reported as the direction from which the wind is blowing
  // 0° = North, 90° = East, 180° = South, 270° = West
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