import React from 'react';

interface WatchlistItem {
  id: number;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
}

interface WatchlistProps {
  items: WatchlistItem[];
  onRemove: (id: number) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ items, onRemove }) => {
  return (
    <div>
      {items.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  alt={item.title || item.name}
                  style={{ marginRight: '1rem', width: '80px' }}
                />
                <div>
                  <h3>{item.title || item.name}</h3>
                  <p>{item.overview}</p>
                  <button onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
