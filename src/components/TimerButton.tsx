import React, { useEffect, useState } from 'react';
import './TimerButton.css';

interface TimerButtonProps {
  label: string;
  onTimeUpdate: (label: string, time: number, wasActivated: boolean) => void;
  disabled: boolean;
}

const TimerButton: React.FC<TimerButtonProps> = ({ label, onTimeUpdate, disabled }) => {
  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isActive, setIsActive] = useState(false); // Track if the button is active

  // Format the timer output as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (disabled && intervalId) {
      clearInterval(intervalId); // Stop the timer when isTestStarted becomes false
      setIntervalId(null);
      setIsActive(false);
    }
  }, [disabled]);

  // Handle timer start/stop logic
  const handleClick = () => {
    if (disabled) return;

    if (isActive) {
      // Button is being deactivated → increment counter
      clearInterval(intervalId!);
      setIntervalId(null);
      setIsActive(false);
      onTimeUpdate(label, time, false); // wasActivated = false
    } else {
      // Button is being activated → start timer
      const id = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          onTimeUpdate(label, newTime, true); // wasActivated = true
          return newTime;
        });
      }, 1000);
      setIntervalId(id);
      setIsActive(true);
    }
  };

  return (
    <button 
      className={`timer-button ${isActive ? 'active' : ''}`} 
      onClick={handleClick} 
      disabled={disabled}
    >
      {label}: {formatTime(time)}
    </button>
  );
};

export default TimerButton;
