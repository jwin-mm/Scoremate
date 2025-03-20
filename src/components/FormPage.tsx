import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { formDataAtom } from '../atoms';
import './FormPage.css'

const FormPage: React.FC = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find fields that are empty
    const emptyFields = Object.entries(formData)
      .filter(([key, value]) => key !== 'flags' && value.trim() === '') // Exclude "flags"
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setErrorMessage(`Fields: ${emptyFields.join(', ')} cannot be left blank`);
      return;
    }

    setErrorMessage(''); // Clear any previous error messages
    setFormData(formData);
    console.log(formData)
    navigate('/experiment');
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label>Experiment Title:</label>
        <input name="testName" value={formData.testName} onChange={handleChange} />
      </div>
      <div>
        <label>Experimenter Name:</label>
        <input name="experimenterName" value={formData.experimenterName} onChange={handleChange} />
      </div>
      <div>
        <label>Rat Number:</label>
        <input name="ratNumber" value={formData.ratNumber} onChange={handleChange} />
      </div>
      <button type="submit">Start Experiment</button>
    </form>
  );
};

export default FormPage;
