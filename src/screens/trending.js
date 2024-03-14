import React from 'react'
import apiClient from '../spotify'
import { useState, useEffect } from 'react';
import './library.css';
import { useNavigate } from 'react-router-dom';

export default function Trending() {
  const [playlists, setPlaylists] = useState(null);

useEffect(() => {
  apiClient.get("browse/featured-playlists").then((res) => {
    const b = res.data?.playlists.items;
    setPlaylists(b);
  })
  .catch((error) => {
    console.log(error);
  });
}, []);

  const navigate = useNavigate();
  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  }
  return (
    <div className='screen-container'>
    <div className='library-body'>
    {playlists?.map((playlist) => (
      <div className='playlist-card' key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
        <img src={playlist.images[0].url} className='playlist-image' alt='playlist image' />
        <p className='playlist-title'>{playlist.name}</p>
        <p className='playlist-subtitle'>{playlist.tracks.total} songs</p>
      </div>
    ))}
    </div>
  </div>
  )
}