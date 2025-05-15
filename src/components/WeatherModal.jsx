import { FaTimes } from 'react-icons/fa'
import WeatherCard from './WeatherCard'
import './WeatherModal.css'

const WeatherModal = ({ isOpen, onClose, weatherData, dayLabel }) => {
  if (!isOpen || !weatherData) return null

  // Split the day into three time periods
  const periods = [
    { label: 'Matin', data: { ...weatherData, tempMax: weatherData.tempMax - 2 } },
    { label: 'Après-midi', data: weatherData },
    { label: 'Soir', data: { ...weatherData, tempMax: weatherData.tempMax - 4 } }
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="modal-title">{dayLabel}</h2>
        <div className="periods-grid">
          {periods.map((period, index) => (
            <div key={index} className="period-item">
              <h3 className="period-label">{period.label}</h3>
              <WeatherCard data={period.data} compact={true} />
            </div>
          ))}
        </div>
        <button className="back-button" onClick={onClose}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}

export default WeatherModal