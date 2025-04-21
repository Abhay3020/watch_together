import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Group {
  id: string;
  name: string;
  type: 'movie' | 'series';
}

interface Props {
  open: boolean;
  onClose: () => void;
  type: 'movie' | 'series';
  onSelectGroup: (groupId: string) => void;
}

const GroupSelectorModal: React.FC<Props> = ({ open, onClose, type, onSelectGroup }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fetchGroups = async () => {
      const res = await axios.get('http://localhost:3001/watchlist-groups');
      const filtered = res.data.filter((g: Group) => g.type === type);
      setGroups(filtered);
    };
    fetchGroups();
  }, [open, type]);

  const handleAutoCreate = async () => {
    setCreating(true);
    const newName = "Playlist 1";
    const res = await axios.post('http://localhost:3001/watchlist-groups', {
      name: newName,
      type,
    });
    setCreating(false);
    onSelectGroup(res.data.id);
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{ backgroundColor: '#fff', color: '#000', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
        <h3>Select a Playlist</h3>
        {groups.length === 0 ? (
          <button onClick={handleAutoCreate} disabled={creating}>
            {creating ? "Creating..." : "Create 'Playlist 1'"}
          </button>
        ) : (
          <ul>
            {groups.map((g) => (
              <li key={g.id}>
                <button onClick={() => onSelectGroup(g.id)}>{g.name}</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} style={{ marginTop: '1rem' }}>Cancel</button>
      </div>
    </div>
  );
};

export default GroupSelectorModal;
