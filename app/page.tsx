"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import useSound from "use-sound";

export default function Home() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background:
          "url('https://i.pinimg.com/originals/1a/a2/00/1aa2008c04d15f46d38b797cb1452ed4.gif') no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <CountdownTimer />
    </div>
  );
}

const CountdownTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [play] = useSound("/beep-01a.mp3");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive && minutes > 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    } else if (minutes === 0 && seconds === 0 && isActive) {
      alert("Time is up!");
      play();
      setIsActive(false);
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) {
      setIsActive(true);
    }
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(Math.max(0, parseInt(e.target.value)));
    setSeconds(0);
  };

  return (
    <div>
      <input
        type="number"
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="Enter minutes"
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <div>
        Timer: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};
