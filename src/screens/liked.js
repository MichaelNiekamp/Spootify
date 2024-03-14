import React from 'react'
import APIKit from '../spotify'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './liked.css';

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




  return (
    <div className='screen-container'>
      
    </div>
    );
}
