import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { formDataAtom, timersAtom, isTestStartedAtom, csvDataAtom, experimentTimeAtom, timerCountersAtom} from '../atoms';
import TimerButton from './TimerButton';
import './ExperimentPage.css';

const ExperimentPage: React.FC = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [timers, setTimers] = useAtom(timersAtom);
  const [timerCounters, setTimerCounters] = useAtom(timerCountersAtom);
  const [isTestStarted, setIsTestStarted] = useAtom(isTestStartedAtom);
  const [experimentTime, setExperimentTime] = useAtom(experimentTimeAtom);
  const [, setCsvData] = useAtom(csvDataAtom);

  const navigate = useNavigate();
  const [experimentInterval, setExperimentInterval] = useState<NodeJS.Timeout | null>(null);

  // Function to format time as MM:SS:MSMS
  const formatTime = (milliseconds: number): string => {
    const mins = Math.floor(milliseconds / 60000); // Total minutes
    const secs = Math.floor((milliseconds % 60000) / 1000); // Remaining seconds
    const ms = milliseconds % 1000; // Remaining milliseconds
  
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (isTestStarted) {
      interval = setInterval(() => {
        setExperimentTime((prev) => prev + 10);
      }, 10);
      setExperimentInterval(interval);
    } else {
      if (experimentInterval) {
        clearInterval(experimentInterval);
      }
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestStarted]);
  

  // Handles individual Timer Button updates
  const handleTimeUpdate = (label: string, time: number, wasActivated: boolean) => {
    setTimers((prev) => ({ 
      ...prev, 
      [label]: (prev[label] || 0) + time 
    }));

    // If wasActivated is false, it means the button was toggled off → increment the counter
    if (!wasActivated) {
      setTimerCounters((prev) => ({
        ...prev,
        [label]: (prev[label] || 0) + 1,
      }));
    }
  };

  const handleStart = () => {
    setIsTestStarted(true);
  };

  const handleStop = () => {
    setIsTestStarted(false);
  }

  const handleFlagButton = () => {
    const newFlag = formatTime(experimentTime)
    setFormData((prev) => ({
      ...prev,
      flags: prev.flags ? `${prev.flags}, ${newFlag}` : newFlag, // Append new flag
    }));
  }

  const generateCSV = () => {
    const csvContent = [
      [`Rat #:`, formData?.ratNumber, `Experimenter:`, formData?.experimenterName].join(','),
      [`Date:`, formData?.experimentDate].join(','),
      ['Action Type', 'Freq', 'Duration (Total)'].join(','), // Column headers
      ...Object.entries(timers).map(([key, value]) => [
        key, timerCounters[key], formatTime(value)
      ]),
      [`Flags:`, formData!.flags],
    ].map(row => row).join('\n'); // Ensure proper CSV formatting
  
    setCsvData(csvContent);
    navigate('/csv-viewer');
  };
  

  return (
    <div className="experiment-container">
      <h2 className="experiment-title">
        {formData?.testName} _{formData?.note}_ {formData?.ratNumber}
      </h2>

      <div className='timer-row'>
        <button className="flag-button" onClick={handleFlagButton}>Flag</button>
        <div className="experiment-timer">
          <h2>Test Time: {formatTime(experimentTime)}</h2>
        </div>
        <button className="flag-button" onClick={handleFlagButton}>Flag</button>
      </div>


      <div className="grid-container">
        <div className="grid-row">
          <TimerButton label="Chasing" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted} />
          <TimerButton label="Boxing" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted} />
        </div>
        <div className="grid-row">
          <TimerButton label="Pouncing" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted} />
          <TimerButton label="Novel Exploration" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted} />
        </div>
        <div className="grid-row">
          <TimerButton label="Pinning" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted} />
          <TimerButton label="AGI" onTimeUpdate={handleTimeUpdate}disabled={!isTestStarted} />
        </div>
      </div>
      

      <div className="button-row">
        <button className="small-button" onClick={handleStart}>Start</button>
        <button className="small-button" onClick={handleStop}>Stop</button>
        <button className="csv-button" onClick={generateCSV}>CSV</button>
      </div>
    </div>
  );
};

export default ExperimentPage;
