import React from 'react'
import './progressCircle.css';


const Circle = ({ color, percentage, size, strokeWidth }) => {
    const radius = size / 2 - 10;
    const circumference = ((radius * 2 * Math.PI) - 20);
    const strokePct = ((100-Math.round(percentage))* circumference) / 100;
    
    return (
        <circle r={radius} cx="50%" cy="50%" fill="transparent" stroke={strokePct !== circumference ? color : ""} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={percentage ? strokePct : 0} strokeLinecap='round'></circle>
    );
}

export default function ProgressCircle({ percentage, isPlaying, image, size, color }) {
  return (
    <div className='progress-circle'>
        <svg width={size} height={size}>
            <g>
                <Circle color="black" size={size} strokeWidth={"0.4rem"}/>
                <Circle color={color} percentage={percentage} size={size} strokeWidth={"0.6rem"}/>
            </g>
            <defs>
                <clipPath id="myCircle">
                    <circle cx="50%" cy="50%" r={size/2-30} fill="white" stroke="black" strokeWidth="0.4rem"></circle>
                </clipPath>
                <clipPath id="myInnerCircle">
                    <circle cx="50%" cy="50%" r={size/2-100} fill="white" stroke="black" strokeWidth="0.4rem"></circle>
                </clipPath>
            </defs>
            <image className={isPlaying ? "active" : ""} x={30} y={30} width={2*((size/2)-30)} height={2*((size/2)-30)} href={image} clipPath="url(#myCircle)"></image>
        </svg>
    </div>
  )
}
