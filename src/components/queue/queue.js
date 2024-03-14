import React from 'react'
import './queue.css';

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

export default function Queue({ tracks, setCurrentIndex }) {
    
  return (
    <div className='queue-container flex'>
      <div className='queue flex'>
        <p className='upNext'>Up Next</p>
        <div className='queue-list'>
          {tracks?.map((track, index) => (
            <div className='queue-item flex' onClick={() => setCurrentIndex(index)}>
              <p className='track-name'>{track?.track?.name}</p>
              <p>{millisecondsToMinutesAndSeconds(track?.track?.duration_ms)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
