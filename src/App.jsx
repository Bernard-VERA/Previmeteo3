import { Routes, Route } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  const { theme } = useTheme()
  
  return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App