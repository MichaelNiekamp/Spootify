import React from 'react'
import APIKit from '../spotify'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './liked.css';
import { MdFavorite } from 'react-icons/md';




function millisecondsToMinutesAndSeconds(milliseconds) {
  // Convert milliseconds to seconds
  let totalSeconds = Math.floor(milliseconds / 1000);
  // Calculate minutes and seconds
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  // Format the output
  let formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return formattedTime;
}


export default function Liked() {
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    APIKit.get('me/tracks').then(function (response) {
      setTracks(response.data.items);
    });
  }, []);

  const navigate = useNavigate();
  const playTrack = (id) => {
    navigate("/player", { state: { id: id } });
  }


  console.log(tracks);


  return (
    <div className='screen-container'>
    <div className='liked-body'>
    {tracks?.map((song) => (
      <div className='song-card' key={song.track.id}>
        <img src={song.track.album.images[0].url} className='song-image' alt='song image' />
        <p className='song-title'>{song.track.name}</p>
        <p className='song-artist'>{song.track.artists[0].name}</p>
        <i className='song-like'><MdFavorite /></i>
        <p className='song-duration'>{millisecondsToMinutesAndSeconds(song.track.duration_ms)}</p>
      </div>
    ))}
    </div>
  </div>
    );
}
