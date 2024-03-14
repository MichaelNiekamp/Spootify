import React from 'react'
import APIKit from '../spotify'
import { useState, useEffect } from 'react';
import './library.css';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function Library() {

  // firebase
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    APIKit.get('me/playlists').then(function (response) {
      setPlaylists(response.data.items);
    });
  }, []);

  const addPlaylists = async (playlists) => {
    try {
      await addDoc(collection(db, "playlists"), { playlists });
      console.log("Document successfully written!");
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const navigate = useNavigate();
  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
    addPlaylists(playlists);
  }

  return (
  <div className='screen-container'>
    <div className='library-body'>
    {playlists?.map((playlist) => (
      <div className='playlist-card' key={playlist.id} onClick={
        () => playPlaylist(playlist.id)}>
        <img src={playlist.images[0].url} className='playlist-image' alt='playlist image' />
        <p className='playlist-title'>{playlist.name}</p>
        <p className='playlist-subtitle'>{playlist.tracks.total} songs</p>
      </div>
    ))}
    </div>
  </div>
  );
}
