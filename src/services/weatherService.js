// Service API OpenMeteo pour les données météorologiques
const OPEN_METEO_WEATHER_API = 'https://api.open-meteo.com/v1/forecast'
const OPEN_METEO_GEO_API = 'https://geocoding-api.open-meteo.com/v1/search'

// Obtient les coordonnées de la ville par son nom
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

// Obtient les prévisions météorologiques pour un emplacement
export const getWeatherForecast = async (latitude, longitude, mode = "home", selectedDate = null) => {
  try {
    const response = await fetch(
      `${OPEN_METEO_WEATHER_API}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return mode === "home" 
      ? formatWeatherDataForHome(data)  // Utilisé pour la page d'accueil
      : formatWeatherDataByHour(data, selectedDate);  // Passe `selectedDate` ici, pour le jour sélectionné
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

// Fonction d'aide pour mapper les codes météorologiques aux descriptions et aux icônes
export const getWeatherInfo = (code) => {
  // Codes d'interprétation météorologique de l'OMM
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

// Transforme la réponse de l'API au format de l'application
const formatWeatherDataByHour = (data, selectedDate) => {
  const { hourly } = data;
  const targetHours = [8, 14, 20];
  const dailyForecast = { date: selectedDate, morning: null, afternoon: null, evening: null };

  hourly.time.forEach((timestamp, index) => {
    const date = timestamp.split('T')[0];
    const hour = new Date(timestamp).getHours();

    if (date !== selectedDate) return; // Filtre uniquement le jour sélectionné
    if (!targetHours.includes(hour)) return; 

    const weatherCode = hourly.weathercode[index];
    const weatherInfo = getWeatherInfo(weatherCode);

    const entry = {
      temp: Math.round(hourly.temperature_2m[index]),
      weatherType: weatherInfo.type,
      weatherDescription: weatherInfo.description,
      windSpeed: Math.round(hourly.windspeed_10m[index]),
      windDirection: hourly.winddirection_10m[index]
    };

    if (hour === 8) dailyForecast.morning = entry;
    else if (hour === 14) dailyForecast.afternoon = entry;
    else if (hour === 20) dailyForecast.evening = entry;
  });

  return dailyForecast;
};

const formatWeatherDataForHome = (data) => {
  const targetHours = [8, 14, 20]; // Heures spécifiques de relevé météo 8h, 14h et 20h
  const { hourly } = data;
  const groupedData = {};

  hourly.time.forEach((timestamp, index) => {
    const date = timestamp.split('T')[0]; // Extrait la date sans l'heure
    const hour = new Date(timestamp).getHours();

    if (!targetHours.includes(hour)) return;

    if (!groupedData[date]) {
      groupedData[date] = {
        date,
        temperatures: [], // Stocke toutes les températures du jour
        weatherTypes: [],
        weatherDescriptions: [],
        windSpeeds: [],
        windDirections: [],
      };
    }

    // Ajoute les valeurs aux listes pour ce jour
    groupedData[date].temperatures.push(hourly.temperature_2m[index]);
    groupedData[date].weatherTypes.push(getWeatherInfo(hourly.weathercode[index]).type);
    groupedData[date].weatherDescriptions.push(getWeatherInfo(hourly.weathercode[index]).description);
    groupedData[date].windSpeeds.push(hourly.windspeed_10m[index]);
    groupedData[date].windDirections.push(hourly.winddirection_10m[index]);
  });

  // Transforme les données regroupées en format final
  return Object.values(groupedData).map((entry) => ({
    date: entry.date,
    tempMax: Math.max(...entry.temperatures),
    tempMin: Math.min(...entry.temperatures),
    weatherType: entry.weatherTypes[0], // Utilise la première météo du jour
    weatherDescription: entry.weatherDescriptions[0],
    windSpeed: Math.round(entry.windSpeeds[0]),
    windDirection: entry.windDirections[0],
  })).slice(0, 3); // Garde seulement aujourd'hui, demain et après-demain
};
