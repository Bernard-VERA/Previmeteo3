import WeatherCard from './WeatherCard'
import './WeatherDisplay.css'

const WeatherDisplay = ({ weatherData, city }) => {
  if (!weatherData || weatherData.length === 0) {
    return null
  }

  // Labels for the three columns
  const dayLabels = ["Aujourd'hui", "Demain", "Après-demain"]

  return (
    <div className="weather-display-container">
      <h2 className="city-name">{city}</h2>
      <div className="weather-grid">
        {weatherData.map((day, index) => (
          <div className="weather-item" key={index}>
            <WeatherCard data={day} dayLabel={dayLabels[index]} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherDisplay