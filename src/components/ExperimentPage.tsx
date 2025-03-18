import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { formDataAtom, timersAtom, isTestStartedAtom, csvDataAtom, experimentTimeAtom, timerCountersAtom} from '../atoms';
import TimerButton from './TimerButton';
import './ExperimentPage.css';

const ExperimentPage: React.FC = () => {
  const [formData] = useAtom(formDataAtom);
  const [timers, setTimers] = useAtom(timersAtom);
  const [timerCounters, setTimerCounters] = useAtom(timerCountersAtom);
  const [isTestStarted, setIsTestStarted] = useAtom(isTestStartedAtom);
  const [experimentTime, setExperimentTime] = useAtom(experimentTimeAtom);
  const [, setCsvData] = useAtom(csvDataAtom);
  const [isExperimentFinished, setIsExperimentFinished] = useState(false);

  const navigate = useNavigate();
  const [experimentInterval, setExperimentInterval] = useState<NodeJS.Timeout | null>(null);

  // Function to format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle experiment timer (persisted with Jotai)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Declare within useEffect

    if (isTestStarted) {
      interval = setInterval(() => {
        setExperimentTime((prev) => prev + 1);
      }, 1000);
      setExperimentInterval(interval);
    } else {
      if (experimentInterval) {
        clearInterval(experimentInterval);
        setExperimentInterval(null);
      }
    }
  
    return () => {
      if (interval) clearInterval(interval); // Properly clears the interval
    };
  }, [isTestStarted]);

  // Handle experiment timer (persisted with Jotai)
  useEffect(() => {
    if (isTestStarted) {
      if (experimentInterval) clearInterval(experimentInterval);
  
      const interval = setInterval(() => {
        setExperimentTime((prev) => prev + 1);
      }, 1000);
      setExperimentInterval(interval);
    } else {
      if (experimentInterval) {
        clearInterval(experimentInterval);
        setExperimentInterval(null);
      }
    }
  
    return () => {
      if (experimentInterval) {
        clearInterval(experimentInterval);
      }
    };
  }, [isTestStarted]);
  

   // Handles individual Timer Button updates
   const handleTimeUpdate = (label: string, time: number, wasActivated: boolean) => {
    setTimers((prev) => ({ ...prev, [label]: time }));

    // If wasActivated is false, it means the button was toggled off → increment the counter
    if (!wasActivated) {
      setTimerCounters((prev) => ({
        ...prev,
        [label]: (prev[label] || 0) + 1,
      }));
    }
  };

  const handleStartStop = () => {
    if (isTestStarted) {
      setIsTestStarted(false);
    } else {
      setExperimentTime(0); // Reset timer when starting a new experiment
      setIsTestStarted(true);
    }
  };

  const handleFinishExperiment = () => {
    setIsExperimentFinished(true);
    setIsTestStarted(false); 
    if (experimentInterval) {
      clearInterval(experimentInterval);
      setExperimentInterval(null);
    }
  };

  const generateCSV = () => {
    const csvContent = [
      [`Rat #:`, formData?.ratNumber, `Experimenter:`, formData?.experimenterName].join(','),
      [`Date:`, formData?.experimentDate].join(','),
      ['Action Type', 'Freq', 'Duration'].join(','), // Column headers
      ...Object.entries(timers).map(([key, value]) => [
        key, timerCounters[key] || 0, value // Use the correct frequency value
      ]),
    ].map(row => row.concat(',')).join('\n'); // Ensure proper CSV formatting
  
    setCsvData(csvContent);
    handleFinishExperiment(); // Ensure experiment stops when CSV is generated
    navigate('/csv-viewer');
  };
  

  return (
    <div className="experiment-container">
      <h1 className="experiment-title">
        {formData?.testName}, {formData?.ratNumber}
      </h1>

      <div className="experiment-timer">
        <h2>Experiment Time: {formatTime(experimentTime)}</h2>
      </div>

      <div className="grid-container">
        <div className="grid-row">
          <TimerButton label="Pouncing" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted || isExperimentFinished} />
          <TimerButton label="Pinning" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted || isExperimentFinished} />
        </div>
        <div className="grid-row">
          <TimerButton label="Chasing" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted || isExperimentFinished} />
          <TimerButton label="Boxing" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted || isExperimentFinished} />
        </div>
        <div className="grid-row">
          <TimerButton label="AGI" onTimeUpdate={handleTimeUpdate}disabled={!isTestStarted || isExperimentFinished} />
          <TimerButton label="Novel Exploration" onTimeUpdate={handleTimeUpdate} disabled={!isTestStarted || isExperimentFinished} />
        </div>
      </div>

      <div className="button-row">
        <button className="small-button" onClick={handleStartStop}>
          {isTestStarted ? 'Stop Experiment' : 'Start Experiment'}
        </button>

        {/* Container to stack CSV and Finish Experiment buttons */}
        <div className="right-buttons-container">
          <button className="small-button" onClick={generateCSV}>CSV</button>
          <button className="small-button finish-button" onClick={handleFinishExperiment}>Finish Experiment</button>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ExperimentPage;
