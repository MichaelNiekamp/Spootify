import React, { useEffect } from 'react'
import './widgets.css';
import apiClient from '../spotify';
import WidgetCard from './widgetCard';

export default function Widgets({ artistID }) {
    const [similar, setSimilar] = React.useState([]);
    const [featured, setFeatured] = React.useState([]);
    const [newReleases, setNewReleases] = React.useState([]);

    useEffect(() => {
        apiClient.get("artists/" + artistID + "/related-artists").then((res) => {
            const a = res.data?.artists.slice(0, 3);
            setSimilar(a);
        })
        .catch((error) => {
            console.log(error);
        });

        apiClient.get("browse/featured-playlists").then((res) => {
            const b = res.data?.playlists.items.slice(0, 3);
            setFeatured(b);
        })
        .catch((error) => {
            console.log(error);
        });

        apiClient.get("browse/new-releases").then((res) => {
            const c = res.data?.albums.items.slice(0, 3);
            setNewReleases(c);
        })
        .catch((error) => {
            console.log(error);
        });

    }, [artistID]);

  return (
    <div className='widget-body flex'>
        <WidgetCard title="Similar Artists" similar={similar}/>
        <WidgetCard title="Made For You" featured={featured}/>
        <WidgetCard title="New Releases" newReleases={newReleases}/>
    </div>
  )
}
