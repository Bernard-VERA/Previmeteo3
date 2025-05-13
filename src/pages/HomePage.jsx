import { useWeather } from '../hooks/useWeather'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import WeatherDisplay from '../components/WeatherDisplay'
import ErrorMessage from '../components/ErrorMessage'
import './HomePage.css'

const HomePage = () => {
  const { weatherData, loading, error, city, fetchWeatherData } = useWeather()

  return (
    <div className="home-page">
      <Navbar />
      <div className="content">
        <SearchBar onSearch={fetchWeatherData} loading={loading} />
        {error && <ErrorMessage message={error} />}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner large"></div>
            <p>Chargement des données météo...</p>
          </div>
        ) : (
          <WeatherDisplay weatherData={weatherData} city={city} />
        )}
      </div>
    </div>
  )
}

export default HomePage