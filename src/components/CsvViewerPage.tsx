import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { csvDataAtom } from '../atoms';

const CsvViewerPage: React.FC = () => {
  const [csvData] = useAtom(csvDataAtom);
  const navigate = useNavigate();

  const rows = csvData?.split('\n').map((row) => row.split(',')) || [];

  return (
    <div>
      <h1>CSV Data</h1>
      <table border={1}>
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
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default CsvViewerPage;
