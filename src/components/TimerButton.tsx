import React, { useState, useEffect } from 'react';
import './TimerButton.css';

interface TimerButtonProps {
  label: string;
  onTimeUpdate: (label: string, time: number, wasActivated: boolean) => void;
  disabled: boolean;
}

const TimerButton: React.FC<TimerButtonProps> = ({ label, onTimeUpdate, disabled }) => {
  const [holdTime, setHoldTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const formatTime = (milliseconds: number): string => {
    const secs = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    return `${secs}.${ms.toString().padStart(3, '0')}s`;
  };

  const handleTouchStart = () => {
    if (disabled || isActive) return;

    const now = Date.now();
    setStartTime(now);
    setIsActive(true);

    const id = setInterval(() => {
      const elapsed = Date.now() - now;
      setHoldTime(elapsed);
      onTimeUpdate(label, elapsed, true);
    }, 10); // Visual update every 10ms

    setIntervalId(id);
  };

  const handleTouchEnd = () => {
    if (!isActive || startTime === null) return;

    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);

    // const finalTime = Date.now() - startTime;
    onTimeUpdate(label, 0, false);

    setIsActive(false);
    setStartTime(null);
    setHoldTime(0); // Reset after release
  };

  // const handleClick = () => {
  //   const startTime = Date.now();
  //   console.log("Start Time:", startTime);
  
  //   setTimeout(() => {
  //     const finalTime = Date.now();
  //     console.log("Final Time:", finalTime);

  //     const diff = finalTime - startTime
  //     console.log(diff)
  
  //     onTimeUpdate(label, diff, false);
  //   }, 1000);
  // };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <button
      className={`timer-button ${isActive ? 'active' : ''}`}
      // onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      disabled={disabled}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {label}: {formatTime(holdTime)}
    </button>
  );
};

export default TimerButton;
