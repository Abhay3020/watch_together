import React from 'react';

interface Result {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
}

interface Props {
  results: Result[];
  onAdd: (item: Result) => void;
}

const SearchResults: React.FC<Props> = ({ results, onAdd }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {results.map((item) => (
        <div key={item.id} style={{ border: '1px solid #444', padding: '1rem', borderRadius: '8px' }}>
          <img
            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
            alt={item.title || item.name}
            style={{ width: '100%', borderRadius: '4px' }}
          />
          <h3>{item.title || item.name}</h3>
          <p style={{ fontSize: '0.85rem' }}>{item.overview?.slice(0, 100)}...</p>
          <button onClick={() => onAdd(item)} style={{ marginTop: '0.5rem' }}>
            ➕ Add to Watchlist
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
