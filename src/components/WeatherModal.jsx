/* eslint-disable  */
import { FaTimes } from 'react-icons/fa'
import { useEffect } from 'react'
import { useWeather } from '../hooks/useWeather'
import WeatherCard from './WeatherCard'
import { useTheme } from '../context/ThemeContext'
import './WeatherModal.css'

const WeatherModal = ({ isOpen, onClose, weatherData, dayLabel }) => {
  const { theme } = useTheme();
  const { fetchDetailedWeatherData, city } = useWeather();

 useEffect(() => {
  if (isOpen && city) {
    fetchDetailedWeatherData(city);
  }
}, [isOpen, city]);

  if (!isOpen || !weatherData) return null

  // Divise la journée en trois périodes de temps
 const periods = weatherData ? [
  { label: 'Matin', data: weatherData.morning },
  { label: 'Après-midi', data: weatherData.afternoon },
  { label: 'Soir', data: weatherData.evening }
  ].filter(period => period.data) : [];
  // Supprime les périodes vides

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${theme}`} onClick={e => e.stopPropagation()}>
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