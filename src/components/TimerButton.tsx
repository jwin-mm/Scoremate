import React, { useState } from 'react';
import './TimerButton.css'

interface TimerButtonProps {
  label: string;
  onTimeUpdate: (time: number) => void;
  disabled?: boolean; // Added support for disabled state
}

const TimerButton: React.FC<TimerButtonProps> = ({ label, onTimeUpdate, disabled }) => {
  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Format the timer output as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle timer start/stop logic
  const handleClick = () => {
    if (disabled) return; // Prevent action if disabled

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  return (
    <button 
      className="timer-button" 
      onClick={handleClick} 
      disabled={disabled}
    >
      {label}: {formatTime(time)}
    </button>
  );
};

export default TimerButton;
