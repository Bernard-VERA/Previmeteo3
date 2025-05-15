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

const WeatherCard = ({ data, dayLabel, compact, onClick }) => {
  if (!data) return null

  const { weatherType, weatherDescription, tempMax, tempMin, windSpeed, windDirection } = data
  
  const getWeatherIcon = () => {
    const iconSize = compact ? 60 : 80
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

  const formatDate = (dateString) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    const date = new Date(dateString)
    return days[date.getDay()]
  }

  const cardClassName = `weather-card fade-in ${onClick ? 'clickable' : ''} ${compact ? 'compact' : ''}`

  return (
    <div className={cardClassName} onClick={onClick}>
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