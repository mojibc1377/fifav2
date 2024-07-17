"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from 'lucide-react';

const calculateTimeLeft = () => {
  const difference = +new Date('2024-12-10T00:00:00') - +new Date();
  let timeLeft 

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    } 
  }

  return timeLeft;
};

const ComingSoon: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col items-center justify-start mt-10 min-h-screen mb-10 text-white">
<div
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground mt-0 mb-5 transition-all hover:text-primary`}>
                    <img src="/ea-logo.png" className="w-9" />
                  <span className="text-white">ChampsPlus+</span>
                </div>
      <Image src="/images/stage.jpg" width={400} height={100}  alt="FIFA e-sports stage" className="mb-8 rounded shadow-lg" />
      <h1 className="text-4xl font-extrabold mb-4 animate-bounce">Coming Soon</h1>
      <div className="flex space-x-4 text-2xl font-bold animate-bounce">
        <div className="flex flex-col items-center ">
          <span>{timeLeft.days}</span>
          <span className="text-sm">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.hours}</span>
          <span className="text-sm">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.minutes}</span>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.seconds}</span>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
