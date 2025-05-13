import { 
  WiDaySunny, 
  WiCloudy, 
  WiDayCloudy, 
  WiRain, 
  WiSnow, 
  WiStrongWind,
  WiThunderstorm,
  WiDayFog,
  WiSleet
} from 'react-icons/wi'
import WindDirection from './WindDirection'
import './WeatherCard.css'

const WeatherCard = ({ data, dayLabel }) => {
  if (!data) return null

  const { weatherType, weatherDescription, tempMax, tempMin, windSpeed, windDirection } = data
  
  // Get appropriate weather icon based on type
  const getWeatherIcon = () => {
    const iconSize = 80
    switch (weatherType) {
      case 'clear':
        return <WiDaySunny size={iconSize} />
      case 'cloudy':
        return <WiCloudy size={iconSize} />
      case 'partlyCloudy':
        return <WiDayCloudy size={iconSize} />
      case 'rain':
      case 'drizzle':
        return <WiRain size={iconSize} />
      case 'snow':
        return <WiSnow size={iconSize} />
      case 'fog':
        return <WiDayFog size={iconSize} />
      case 'freezingRain':
        return <WiSleet size={iconSize} />
      case 'thunderstorm':
        return <WiThunderstorm size={iconSize} />
      default:
        return <WiStrongWind size={iconSize} />
    }
  }

  // Format date to display day of week
  const formatDate = (dateString) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    const date = new Date(dateString)
    return days[date.getDay()]
  }

  return (
    <div className="weather-card fade-in">
      <h2 className="day-label">{dayLabel || formatDate(data.date)}</h2>
      <div className="weather-icon">
        {getWeatherIcon()}
      </div>
      <p className="weather-description">{weatherDescription}</p>
      <div className="temperature">
        <span className="temp-max">{tempMax}°C</span>
        {tempMin !== tempMax && <span className="temp-min"> / {tempMin}°C</span>}
      </div>
      <div className="wind-info">
        <WindDirection direction={windDirection} />
        <span className="wind-speed">{windSpeed} km/h</span>
      </div>
    </div>
  )
}

export default WeatherCard