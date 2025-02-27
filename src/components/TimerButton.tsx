import React, { useState } from 'react';

interface TimerButtonProps {
  label: string;
  onTimeUpdate: (time: number) => void;
}

const TimerButton: React.FC<TimerButtonProps> = ({ label, onTimeUpdate }) => {
  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleClick = () => {
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
    <button onClick={handleClick}>
      {label}: {formatTime(time)}
    </button>
  );
};

export default TimerButton;
