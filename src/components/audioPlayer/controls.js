import React from 'react'
import './controls.css';
import { IconContext } from 'react-icons';
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';
import { IoPause } from 'react-icons/io5';

export default function Controls({ isPlaying, setIsPlaying, handleNext, handlePrev }) {
  return (
    <IconContext.Provider value={{ size: '35px', color: "white" }}>
      <div className="controls-wrapper flex">
        <div className="action-btn flex" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>
        <div className="play-pause-btn flex" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <IoPause /> : <IoPlay />}
        </div>
        <div className="action-btn flex" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>
      </div>
    </IconContext.Provider>
  )
}
