import React, { useState } from 'react';
import axios from 'axios';

interface SearchBarProps {
  onResults: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchTMDB = async () => {
    if (!query) return;

    const apiKey = process.env.REACT_APP_TMDB_API_KEY;

    if (!apiKey) {
      console.error('TMDB API key is missing.');
      setError('TMDB API key not found.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
        params: {
          api_key: apiKey,
          query,
        },
      });

      onResults(response.data.results);
    } catch (err) {
      console.error('Error fetching from TMDB:', err);
      setError('Failed to fetch results. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search for a movie or show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px' }}
        />
        <button onClick={searchTMDB} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SearchBar;
