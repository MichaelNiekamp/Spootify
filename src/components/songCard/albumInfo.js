import React from 'react'
import './albumInfo.css';

export default function AlbumInfo({ album }) {
  console.log(album);
  const artists = []
  album?.artists?.forEach((artist) => {
    artists.push(artist.name)
  });
  return (
    <div className='albumInfo-card'>
      <div className='albumName-container'>
        <p>{album?.name + " - " + artists?.join(",")}</p>
      </div>
      <div className='album-info'>
        <p>{`${album?.name} is an ${album?.album_type} with ${album?.total_tracks} tracks by ${artists?.join(",")}.`}</p>
      </div>
      <div className='album-release'>
        <p>Released: {album?.release_date}</p>
      </div>
    </div>
  )
}
