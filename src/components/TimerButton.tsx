import React, { useState } from 'react';
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

  // Format the timer output as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Start timing when the user touches the button
  const handleTouchStart = () => {
    if (disabled || isActive) return;
    setStartTime(Date.now());
    setIsActive(true);
  };

  // Stop timing when the user lifts their finger
  const handleTouchEnd = () => {
    if (!isActive || startTime === null) return;

    const elapsedTime = (Date.now() - startTime); // Convert ms to sec
    setHoldTime((prev) => prev + elapsedTime); // Accumulate total time
    setStartTime(null);
    setIsActive(false);

    onTimeUpdate(label, holdTime + elapsedTime, false); // Update time when released
  };

  return (
    <button
      className={`timer-button ${isActive ? 'active' : ''}`}
      onTouchStart={handleTouchStart}  // Mobile press
      onTouchEnd={handleTouchEnd}      // Mobile release
      onTouchCancel={handleTouchEnd}   // Ensures timer stops if touch is interrupted
      disabled={disabled}
    >
      {label}: {formatTime(holdTime)}
    </button>
  );
};

export default TimerButton;
