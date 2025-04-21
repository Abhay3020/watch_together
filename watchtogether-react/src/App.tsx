import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import GroupSelectorModal from './components/GroupSelectorModal';

import WatchlistPage from './pages/WatchlistPage';

function App() {
  const [results, setResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [itemType, setItemType] = useState<'movie' | 'series'>('movie');

  const handleAddClick = (item: any) => {
    const type = item.media_type === 'tv' ? 'series' : 'movie';
    setItemType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleGroupSelected = async (groupId: string) => {
    setShowModal(false);
    if (!selectedItem) return;

    const title = selectedItem.title || selectedItem.name;

    try {
      await fetch('http://localhost:3001/watchlist-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group_id: groupId,
          title,
          name: selectedItem.name,
          overview: selectedItem.overview,
          poster_path: selectedItem.poster_path,
        }),
      });
      alert(`Added "${title}" to watchlist ✅`);
    } catch (err) {
      console.error('Failed to add item:', err);
      alert('Something went wrong while adding to watchlist.');
    }

    setSelectedItem(null);
  };

  return (
    <Router>
      <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", padding: "2rem" }}>
        <Navbar onHomeClick={() => { setResults([]); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onResults={setResults} />
                <SearchResults results={results} onAdd={handleAddClick} />
                <GroupSelectorModal
                  open={showModal}
                  onClose={() => setShowModal(false)}
                  type={itemType}
                  onSelectGroup={handleGroupSelected}
                />
              </>
            }
          />
          <Route path="/watchlists" element={<WatchlistPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
