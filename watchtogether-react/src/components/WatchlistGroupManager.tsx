import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Group {
  id: string;
  name: string;
  type: 'movie' | 'series';
}

interface Props {
  type: 'movie' | 'series';
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string | null) => void; 
}

const WatchlistGroupManager: React.FC<Props> = ({ type, selectedGroupId, onSelectGroup }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:3001/watchlist-groups');
      setGroups(response.data.filter((g: Group) => g.type === type));
    } catch (err) {
      console.error('Error fetching groups:', err);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    try {
      const response = await axios.post('http://localhost:3001/watchlist-groups', {
        name: newGroupName,
        type,
      });
      setGroups([response.data, ...groups]);
      setNewGroupName('');
    } catch (err) {
      console.error('Error creating group:', err);
    }
  };

  const handleRename = async (id: string) => {
    try {
      const response = await axios.patch(`http://localhost:3001/watchlist-groups/${id}`, {
        name: editedName,
      });
      setGroups(groups.map((g) => (g.id === id ? response.data : g)));
      setEditingGroupId(null);
    } catch (err) {
      console.error('Error renaming group:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/watchlist-groups/${id}`);
      setGroups(groups.filter((g) => g.id !== id));
      if (selectedGroupId === id) onSelectGroup(null); // clear if deleted
    } catch (err) {
      console.error('Error deleting group:', err);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>{type === 'movie' ? '🎬 Movie Lists' : '📺 Series Lists'}</h3>
      <input
        type="text"
        placeholder="New watchlist name..."
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Create</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {groups.map((group) => (
          <li key={group.id} style={{ marginTop: '0.5rem' }}>
            {editingGroupId === group.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => handleRename(group.id)}>Save</button>
                <button onClick={() => setEditingGroupId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => onSelectGroup(group.id)} style={{ fontWeight: selectedGroupId === group.id ? 'bold' : 'normal' }}>
                  {group.name}
                </button>
                <button onClick={() => {
                  setEditingGroupId(group.id);
                  setEditedName(group.name);
                }}>✏️</button>
                <button onClick={() => handleDelete(group.id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchlistGroupManager;
