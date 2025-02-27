import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './components/FormPage';
import ExperimentPage from './components/ExperimentPage';
import CsvViewerPage from './components/CsvViewerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/experiment" element={<ExperimentPage />} />
        <Route path="/csv-viewer" element={<CsvViewerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
