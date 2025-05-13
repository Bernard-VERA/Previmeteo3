import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Rechercher une ville..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            <FaSearch />
          )}
        </button>
      </form>
    </div>
  )
}

export default SearchBar