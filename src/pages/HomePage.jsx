import { useWeather } from '../hooks/useWeather'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import WeatherDisplay from '../components/WeatherDisplay'
import Footer from '../components/Footer'
import ErrorMessage from '../components/ErrorMessage'
import './HomePage.css'

const HomePage = () => {
  const { weatherData, loading, error, city, fetchWeatherData } = useWeather()

  return (
    <div className="home-page">
      <Navbar />
      <div className="info-text"><p>Prévisions sur 3 jours</p></div>
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
      <div className="detail-text"><p>Cliquez sur une journée pour les détails !</p></div>
      <Footer />
    </div>
  )
}

export default HomePage