import { useState, useEffect } from 'react'
import { getCityCoordinates, getWeatherForecast } from '../services/weatherService'

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState(() => {
    // Try to get the last searched city from localStorage
    return localStorage.getItem('lastCity') || 'Marseille'
  })

  const fetchWeatherData = async (cityName) => {
    setLoading(true)
    setError(null)
    
    try {
      // Get city coordinates
      const coordinates = await getCityCoordinates(cityName)
      
      // Get weather forecast with coordinates
      const forecast = await getWeatherForecast(coordinates.latitude, coordinates.longitude)
      
      // Save city to state and localStorage
      setCity(coordinates.name)
      localStorage.setItem('lastCity', coordinates.name)
      
      setWeatherData(forecast)
    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch weather for default/saved city on initial load
  useEffect(() => {
    fetchWeatherData(city)
  }, [])

  return {
    weatherData,
    loading,
    error,
    city,
    fetchWeatherData
  }
}