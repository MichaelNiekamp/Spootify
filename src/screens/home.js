import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from './library';
import Trending from './trending';
import Player from './player';
import Liked from './liked';
import Sidebar from '../components/sidebar';
import './home.css';
import Login from './login';
import { useState } from 'react';
import { setClientToken } from '../spotify';


export default function Home() {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);


  return !token ? (
  <Login />
  ) : (
    <Router>
        <div className='main-body'>
    <Sidebar />
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/player" element={<Player />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
      </div>
    </Router>
  )
}