import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WatchlistItem {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
}

interface Props {
  groupId: string;
}

const WatchlistItems: React.FC<Props> = ({ groupId }) => {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/watchlist-items/${groupId}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [groupId]);

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/watchlist-items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  return (
    <div>
      <h3>📂 Items in Group</h3>
      {items.length === 0 && <p>No items in this watchlist group yet.</p>}
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1rem', background: '#222', padding: '1rem', borderRadius: '8px' }}>
          <h4>{item.title}</h4>
          <p>{item.overview}</p>
          {item.poster_path && (
            <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title} />
          )}
          <button onClick={() => handleRemove(item.id)} style={{ marginTop: '0.5rem' }}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default WatchlistItems;
