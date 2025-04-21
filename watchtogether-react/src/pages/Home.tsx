import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MediaCard from '../components/MediaCard';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTVShows] = useState<any[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const tvRes = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setMovies(movieRes.data.results);
        setTVShows(tvRes.data.results);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };
    fetchMedia();
  }, []);

  const handleAdd = (item: any) => {
    console.log('Clicked to add:', item);
    // Open modal if needed (already implemented in App)
  };

  const renderSection = (title: string, list: any[]) => (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '1rem',
        paddingBottom: '0.5rem'
      }}>
        {list.map(item => (
          <MediaCard
            key={item.id}
            title={item.title || item.name}
            posterPath={item.poster_path}
            onAdd={() => handleAdd(item)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '2rem' }}>
      {renderSection("🔥 Trending Movies", movies)}
      {renderSection("📺 Trending TV Shows", tvShows)}
    </div>
  );
};

export default Home;
