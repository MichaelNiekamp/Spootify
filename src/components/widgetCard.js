import React from 'react'
import './widgetCard.css';
import WidgetEntry from './widgetEntry';
import { useNavigate } from 'react-router-dom';


export default function WidgetCard({ title, similar, featured, newReleases }) {
    const navigate = useNavigate();
    const move = () => {
        navigate("/trending", {  });
    }

    return (
    <div onClick={() => move()} className='widgetcard-body'>
        <p className='widget-title'>{title}</p>
        {
            similar && similar.length > 0 ? similar.map(artist => (
                <WidgetEntry title={artist?.name} subtitle={artist?.followers.total + " followers"} image={artist?.images[0]?.url}/>
            )): 
            featured && featured.length > 0 ? featured.map(playlist => (
                <WidgetEntry title={playlist?.name} subtitle={"Made by " + playlist?.owner.display_name} image={playlist?.images[0]?.url}/>
            )): 
            newReleases && newReleases.length > 0 ? newReleases.map(album => (
                <WidgetEntry title={album?.name} subtitle={album?.artists[0].name} image={album?.images[2]?.url}/>
            )) 
            : null
        }
    </div>
    )
}
