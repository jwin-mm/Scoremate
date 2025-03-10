import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { formDataAtom, timersAtom, isTestStartedAtom, isTestFinishedAtom, csvDataAtom } from '../atoms';
import TimerButton from './TimerButton';
import './ExperimentPage.css'; 

const ExperimentPage: React.FC = () => {
  const [formData] = useAtom(formDataAtom);
  const [timers, setTimers] = useAtom(timersAtom);
  const [isTestStarted, setIsTestStarted] = useAtom(isTestStartedAtom);
  const [isTestFinished, setIsTestFinished] = useAtom(isTestFinishedAtom);
  const [, setCsvData] = useAtom(csvDataAtom);

  const navigate = useNavigate();

  const handleTimeUpdate = (label: string, time: number) => {
    setTimers((prev) => ({ ...prev, [label]: time }));
  };

  const handleStartStop = () => {
    setIsTestStarted(!isTestStarted);
  };

  const handleFinishTest = () => {
    setIsTestFinished(true);
  };

  const generateCSV = () => {
    const csvContent = [
      [`Rat #:`, formData?.animalNumber, `Experimenter:`, formData?.experimenterName].join(','), // First row
      [`Date:`, formData?.experimentDate].join(','), // Second row
      ['', 'Freq', 'Duration'].join(','), // Third row (column headers)
      ...Object.entries(timers).map(([key, value]) => [key, 1, value]),
    ].join('\n'); // Join all rows with newline characters
  
    setCsvData(csvContent);
    navigate('/csv-viewer');
  };

  return (
    <div className="experiment-container">
      <h1 className="experiment-title">
        {formData?.testName}, {formData?.animalNumber}
      </h1>
      
      <div className="grid-container">
        <div className="grid-row">
          <TimerButton label="Pouncing" onTimeUpdate={(time) => handleTimeUpdate('Pouncing', time)} disabled={!isTestStarted || isTestFinished} />
          <TimerButton label="Pinning" onTimeUpdate={(time) => handleTimeUpdate('Pinning', time)} disabled={!isTestStarted || isTestFinished} />
        </div>
        <div className="grid-row">
          <TimerButton label="Chasing" onTimeUpdate={(time) => handleTimeUpdate('Chasing', time)} disabled={!isTestStarted || isTestFinished} />
          <TimerButton label="Boxing" onTimeUpdate={(time) => handleTimeUpdate('Boxing', time)} disabled={!isTestStarted || isTestFinished} />
        </div>
        <div className="grid-row">
          <TimerButton label="AGI" onTimeUpdate={(time) => handleTimeUpdate('AGI', time)} disabled={!isTestStarted || isTestFinished} />
          <TimerButton label="Novel Exploration" onTimeUpdate={(time) => handleTimeUpdate('Novel Exploration', time)} disabled={!isTestStarted || isTestFinished} />
        </div>
      </div>

      <div className="button-row">
        <button className="small-button" onClick={handleStartStop} disabled={isTestFinished}>
          {isTestStarted ? 'Stop Experiment' : 'Start Experiment'}
        </button>
        <button className="small-button" onClick={handleFinishTest} disabled={!isTestStarted || isTestFinished}>
          Finish Test
        </button>
        <button className="small-button" onClick={generateCSV}>CSV</button>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ExperimentPage;
