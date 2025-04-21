import React from 'react';

interface MediaCardProps {
  title: string;
  posterPath: string;
  onAdd?: () => void; 
}

const MediaCard: React.FC<MediaCardProps> = ({ title, posterPath, onAdd }) => {
  return (
    <div style={{ width: '150px', margin: '0.5rem', cursor: 'pointer' }} onClick={onAdd}>
      <img
        src={`https://image.tmdb.org/t/p/w300${posterPath}`}
        alt={title}
        style={{ borderRadius: '8px', width: '100%' }}
      />
      <p style={{ fontSize: '0.9rem', textAlign: 'center', marginTop: '0.5rem' }}>{title}</p>
    </div>
  );
};

export default MediaCard;
