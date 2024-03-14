import React, { useEffect, useState } from 'react'
import './sidebar.css';
import SidebarButton from './sidebarButton';
import { MdFavorite } from "react-icons/md";
import { MdPlayArrow } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import apiClient from '../../spotify';


export default function Sidebar() {
  const [image, setImage] = useState('https://www.w3schools.com/howto/img_avatar.png');

  function signOut() {
    localStorage.removeItem('token');
  }

  function signOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  useEffect(() => {
    apiClient.get('me').then((res) => {
      if (!res.data.images.length) return;
      setImage(res.data.images[0].url);
    });
  }, []);
  return (
    <div className='sidebar-container'>
      <img src={image} className='profile-img' alt='avatar' />
      <div className='sidebar-button'>
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />}/>
        <SidebarButton title="Library" to="/" icon={<MdLibraryMusic />}/>
        <SidebarButton title="Liked" to="/liked" icon={<MdFavorite />}/>
        <div className=''>
        <SidebarButton title="Player" to="/player" icon={<MdPlayArrow />}/>
        </div>
      </div>
      <div onClick={signOut}>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />}/>
      </div>
    </div>
  )
}
