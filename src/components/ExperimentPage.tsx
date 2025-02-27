import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { formDataAtom, timersAtom, isTestStartedAtom, isTestFinishedAtom, csvDataAtom } from '../atoms';
import TimerButton from './TimerButton';

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
      ['Test Name', formData?.testName],
      ['Experimenter Name', formData?.experimenterName],
      ['Animal Number', formData?.animalNumber],
      ['Experiment Date', formData?.experimentDate],
      ['Experiment Time', formData?.experimentTime],
      ...Object.entries(timers).map(([key, value]) => [key, value]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    setCsvData(csvContent);
    navigate('/csv-viewer');
  };

  return (
    <div>
      <h1>Experiment: {formData?.testName}</h1>
      <div>
        {Object.keys(timers).map((label) => (
          <TimerButton
            key={label}
            label={label.charAt(0).toUpperCase() + label.slice(1)}
            onTimeUpdate={(time) => handleTimeUpdate(label, time)}
            disabled={!isTestStarted || isTestFinished}
          />
        ))}
      </div>
      <button onClick={handleStartStop} disabled={isTestFinished}>
        {isTestStarted ? 'Stop Experiment' : 'Start Experiment'}
      </button>
      <button onClick={handleFinishTest} disabled={!isTestStarted || isTestFinished}>
        Finish Test
      </button>
      <button onClick={generateCSV}>Generate CSV</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ExperimentPage;
