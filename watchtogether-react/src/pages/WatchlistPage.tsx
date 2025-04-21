import React, { useState } from 'react';
import WatchlistGroupManager from '../components/WatchlistGroupManager';
import WatchlistItems from '../components/WatchlistItems';

const WatchlistPage: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'movie' | 'series'>('movie');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎬 Your Watchlists</h2>
      
      {/* Tab switcher for movie/series */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setSelectedType('movie')} style={{ marginRight: '1rem' }}>
          Movies
        </button>
        <button onClick={() => setSelectedType('series')}>
          Series
        </button>
      </div>

      {/* Group manager for selected type */}
      <WatchlistGroupManager
        type={selectedType}
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
      />

      {/* Show items inside the selected group */}
      {selectedGroupId && <WatchlistItems groupId={selectedGroupId} />}
    </div>
  );
};

export default WatchlistPage;
