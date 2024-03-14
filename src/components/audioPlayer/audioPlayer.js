import React, { useEffect, useRef } from 'react'
import './audioPlayer.css';
import ProgressCircle from './progressCircle';
import Controls from './controls';
import { useState } from 'react';



export default function AudioPlayer({ currentTrack, currentIndex, setCurrentIndex, total }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    var audioSrc = total[currentIndex]?.track?.preview_url;

    const audioRef = React.useRef(new Audio(total[0]?.track.preview_url));
    const instervalRef = React.useRef();
    const isReady = React.useRef(false);
    const { duration } = audioRef.current;

    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

    const startTimer = () => {
        clearInterval(instervalRef.current);
        instervalRef.current = setInterval(() => {
            if (audioRef.current.ended){
                handleNext();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    }

    useEffect(() => {
        if (isPlaying && audioRef.current){
            audioRef.current = new Audio(audioSrc);
            var playPromise = audioRef.current.play();
            if (playPromise !== undefined){
                playPromise.then(() => {
                    audioRef.current.play();
                }).catch((error) => {
                    console.log(error);
                });
            }
            startTimer();
        } else {
            clearInterval(instervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);
        var playPromise = audioRef.current.play();
            if (playPromise !== undefined){
                playPromise.then(() => {
                    audioRef.current.play();
                }).catch((error) => {
                    console.log(error);
                });
            }
            startTimer();
    }, [currentIndex]);


    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(instervalRef.current);
        }
    }, []);

    const handleNext = () => {
        if (currentIndex === total.length - 1){
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handlePrev = () => {
        if (currentIndex === 0){
            setCurrentIndex(total.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const addZero = (num) => {
        return num < 10 ? `0${num}` : num;
    }

    const artists = []
    currentTrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name);
    });

  return (
    <div className='player-body flex'>
        <div className='player-left-body'>
            <ProgressCircle percentage={currentPercentage} isPlaying={true} image={currentTrack?.album?.images[0]?.url} size={300} color="white"/>
        </div>
        <div className='player-right-body flex'>
            <p className='song-title'>{currentTrack?.name}</p>
            <p className='song-artist'>{artists.join(" | ")}</p>
            <div className='player-right-botom'>
                <div className='song-duration flex'>
                    <p className='duration'>0:{addZero(Math.round(trackProgress))}</p>
                    <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} handleNext={handleNext} handlePrev={handlePrev} total={total}/>
                    <p className='duration'>0:30</p>
                </div>
            </div>
        </div>
    </div>
  )
}
