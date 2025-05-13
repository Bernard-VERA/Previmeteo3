// OpenMeteo API service for weather data
const OPEN_METEO_WEATHER_API = 'https://api.open-meteo.com/v1/forecast'
const OPEN_METEO_GEO_API = 'https://geocoding-api.open-meteo.com/v1/search'

// Get city coordinates by name
export const getCityCoordinates = async (cityName) => {
  try {
    const response = await fetch(`${OPEN_METEO_GEO_API}?name=${encodeURIComponent(cityName)}&count=1`)
    
    if (!response.ok) {
      throw new Error('Ville inconnue')
    }
    
    const data = await response.json()
    
    if (!data.results || data.results.length === 0) {
      throw new Error('Ville inconnue')
    }
    
    const { latitude, longitude, name } = data.results[0]
    return { latitude, longitude, name }
  } catch (error) {
    console.error('Error fetching city coordinates:', error)
    throw error
  }
}

// Get weather forecast for a location
export const getWeatherForecast = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${OPEN_METEO_WEATHER_API}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&forecast_days=3`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }
    
    const data = await response.json()
    return formatWeatherData(data)
  } catch (error) {
    console.error('Error fetching weather forecast:', error)
    throw error
  }
}

// Helper function to map weather codes to descriptions and icons
export const getWeatherInfo = (code) => {
  // WMO Weather interpretation codes
  // https://open-meteo.com/en/docs
  const weatherCodes = {
    0: { description: 'Ensoleillé', type: 'clear' },
    1: { description: 'Majoritairement ensoleillé', type: 'clear' },
    2: { description: 'Partiellement nuageux', type: 'partlyCloudy' },
    3: { description: 'Nuageux', type: 'cloudy' },
    45: { description: 'Brumeux', type: 'fog' },
    48: { description: 'Brouillard givrant', type: 'fog' },
    51: { description: 'Bruine légère', type: 'drizzle' },
    53: { description: 'Bruine modérée', type: 'drizzle' },
    55: { description: 'Bruine dense', type: 'drizzle' },
    56: { description: 'Bruine verglaçante légère', type: 'freezingRain' },
    57: { description: 'Bruine verglaçante dense', type: 'freezingRain' },
    61: { description: 'Pluie légère', type: 'rain' },
    63: { description: 'Pluie modérée', type: 'rain' },
    65: { description: 'Pluie forte', type: 'rain' },
    66: { description: 'Pluie verglaçante légère', type: 'freezingRain' },
    67: { description: 'Pluie verglaçante forte', type: 'freezingRain' },
    71: { description: 'Neige légère', type: 'snow' },
    73: { description: 'Neige modérée', type: 'snow' },
    75: { description: 'Neige forte', type: 'snow' },
    77: { description: 'Grains de neige', type: 'snow' },
    80: { description: 'Averses de pluie légères', type: 'rain' },
    81: { description: 'Averses de pluie modérées', type: 'rain' },
    82: { description: 'Averses de pluie violentes', type: 'rain' },
    85: { description: 'Averses de neige légères', type: 'snow' },
    86: { description: 'Averses de neige fortes', type: 'snow' },
    95: { description: 'Orage', type: 'thunderstorm' },
    96: { description: 'Orage avec grêle légère', type: 'thunderstorm' },
    99: { description: 'Orage avec grêle forte', type: 'thunderstorm' }
  }

  return weatherCodes[code] || { description: 'Mitigé', type: 'mixed' }
}

// Transform API response to application format
const formatWeatherData = (data) => {
  const { daily } = data
  
  return daily.time.map((date, index) => {
    const weatherCode = daily.weathercode[index]
    const weatherInfo = getWeatherInfo(weatherCode)
    
    return {
      date,
      tempMax: Math.round(daily.temperature_2m_max[index]),
      tempMin: Math.round(daily.temperature_2m_min[index]),
      weatherType: weatherInfo.type,
      weatherDescription: weatherInfo.description,
      windSpeed: Math.round(daily.windspeed_10m_max[index]),
      windDirection: daily.winddirection_10m_dominant[index]
    }
  })
}