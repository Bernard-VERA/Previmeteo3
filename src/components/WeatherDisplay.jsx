/* eslint-disable  */
import { useState } from 'react'
import WeatherCard from './WeatherCard'
import WeatherModal from './WeatherModal'
import { useWeather } from '../hooks/useWeather'
import './WeatherDisplay.css'

const WeatherDisplay = ({ weatherData, city }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayLabel, setSelectedDayLabel] = useState('');

  if (!weatherData || weatherData.length === 0) {
    return null;
  }

  // Étiquettes pour les trois colonnes
  const dayLabels = ["Aujourd'hui", "Demain", "Après-demain"];

  // Utilisation de useWeather() ici, au niveau du composant
  const { fetchDetailedWeatherData } = useWeather();
  
const handleCardClick = async (day, label) => {
  setSelectedDayLabel(label);
  
  try {
    const detailedData = await fetchDetailedWeatherData(day.date);
    setSelectedDay(detailedData);
  } catch (error) {
    console.error("Erreur lors du chargement des données détaillées :", error);
  }
};

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