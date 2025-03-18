import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import FormPage from './components/FormPage';
import ExperimentPage from './components/ExperimentPage';
import CsvViewerPage from './components/CSVViewPage';
import './App.css'

const App: React.FC = () => {
  return (
    <BrowserRouter basename='/playmate/'>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/experiment" element={<ExperimentPage />} />
        <Route path="/csv-viewer" element={<CsvViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
