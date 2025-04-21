import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <h1
        style={{ color: '#fff', cursor: 'pointer' }}
        onClick={() => {
          onHomeClick();
          navigate('/');
        }}
      >
        🎬 Watch Together
      </h1>

      <button onClick={() => navigate('/watchlists')}>
        📂 Watchlists
      </button>
    </div>
  );
};

export default Navbar;
