import { useState } from 'react'
import WeatherCard from './WeatherCard'
import WeatherModal from './WeatherModal'
import './WeatherDisplay.css'

const WeatherDisplay = ({ weatherData, city }) => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedDayLabel, setSelectedDayLabel] = useState('')

  if (!weatherData || weatherData.length === 0) {
    return null
  }

  // Labels for the three columns
  const dayLabels = ["Aujourd'hui", "Demain", "Après-demain"]

    const handleCardClick = (day, label) => {
    setSelectedDay(day)
    setSelectedDayLabel(label)
  }

  return (
    <div className="weather-display-container">
      <h2 className="city-name">{city}</h2>
      <div className="weather-grid">
        {weatherData.map((day, index) => (
          <div className="weather-item" key={index}>
            <WeatherCard data={day} dayLabel={dayLabels[index]}
             onClick={() => handleCardClick(day, dayLabels[index])}/>
          </div>
        ))}
      </div>
      <WeatherModal 
        isOpen={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        weatherData={selectedDay}
        dayLabel={selectedDayLabel}
      />
    </div>
  )
}

export default WeatherDisplay