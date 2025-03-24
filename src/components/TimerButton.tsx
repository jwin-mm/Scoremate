import React, { useEffect, useState } from 'react';
import './TimerButton.css';

interface TimerButtonProps {
  label: string;
  onTimeUpdate: (label: string, time: number, wasActivated: boolean) => void;
  disabled: boolean;
}

const TimerButton: React.FC<TimerButtonProps> = ({ label, onTimeUpdate, disabled }) => {
  const [holdTime, setHoldTime] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);

  // Format time in MM:SS
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle press start (mobile)
  const handleTouchStart = () => {
    if (disabled || isActive) return;

    const now = Date.now();
    setStartTimestamp(now);
    setIsActive(true);

    const id = setInterval(() => {
      const elapsed = Date.now() - now;
      setHoldTime((prev) => {
        const updated = prev + 1000;
        onTimeUpdate(label, updated, true);
        return updated;
      });
    }, 1000);

    setIntervalId(id);
  };

  // Handle release (mobile)
  const handleTouchEnd = () => {
    if (!isActive || startTimestamp === null) return;

    const now = Date.now();
    const elapsed = now - startTimestamp;
    setHoldTime((prev) => {
      const total = prev + elapsed;
      onTimeUpdate(label, total, false); // Final update when released
      return total;
    });

    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setIsActive(false);
    setStartTimestamp(null);
  };

  // Cleanup if unmounted while active
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <button
      className={`timer-button ${isActive ? 'active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      disabled={disabled}
    >
      {label}: {formatTime(holdTime)}
    </button>
  );
};

export default TimerButton;
