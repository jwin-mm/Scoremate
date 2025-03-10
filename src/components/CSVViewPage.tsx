import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { csvDataAtom } from '../atoms';
import './CSVViewPage.css'; // Import the new CSS file

const CsvViewerPage: React.FC = () => {
  const [csvData] = useAtom(csvDataAtom);
  const navigate = useNavigate();

  const rows = csvData?.split('\n').map((row) => row.split(',')) || [];

  // Function to handle CSV download
  const downloadCSV = () => {
    const blob = new Blob([csvData!], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'experiment_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="csv-container">
      <h1 className="csv-title">CSV Data</h1>

      <div className="csv-table-container">
        <table className="csv-table">
          <thead>
            <tr>
              {rows[0]?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {isNaN(Number(cell)) ? cell : Number(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="csv-buttons">
        <button className="csv-button" onClick={downloadCSV}>Download CSV</button>
        <button className="csv-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default CsvViewerPage;
