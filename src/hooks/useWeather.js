import { useState, useEffect } from 'react'
import { getCityCoordinates, getWeatherForecast } from '../services/weatherService'

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState(() => {
    // Essaie d'obtenir la dernière ville recherchée dans le localStorage.
    return localStorage.getItem('lastCity') || 'Marseille'
  })

  const fetchWeatherData = async (cityName) => {
    setLoading(true)
    setError(null)
    
    try {
      // Récupère les coordonnées de la ville
      const coordinates = await getCityCoordinates(cityName)
      
      // Récupère les prévisions météorologiques avec des coordonnées
      const forecast = await getWeatherForecast(coordinates.latitude, coordinates.longitude, "home")

      // Enregistre la ville dans le state et le stockage local
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
const fetchDetailedWeatherData = async (date) => {
  setLoading(true);
  setError(null);

  try {
    const coordinates = await getCityCoordinates(city);
    const detailedForecast = await getWeatherForecast(coordinates.latitude, coordinates.longitude, "hourly", date);

    return detailedForecast; //  Ajoute un retour
  } catch (err) {
    setError(err.message || 'Une erreur est survenue.');
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // Récupérer la météo pour la ville par défaut/sauvegardée au chargement initial
  useEffect(() => {
    fetchWeatherData(city)
  }, [city])

  return {
    weatherData,
    loading,
    error,
    city,
    fetchWeatherData,
    fetchDetailedWeatherData
  };
}



