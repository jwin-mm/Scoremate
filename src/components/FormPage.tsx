import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { formDataAtom } from '../atoms';
import './FormPage.css'

const FormPage: React.FC = () => {
  const [form, setForm] = useAtom(formDataAtom);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find fields that are empty
    const emptyFields = Object.entries(form)
      .filter(([, value]) => value.trim() === '')
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setErrorMessage(`Fields: ${emptyFields.join(', ')} cannot be left blank`);
      return;
    }

    setErrorMessage(''); // Clear any previous error messages
    setForm(form);
    console.log(form)
    navigate('/experiment');
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label>Test Name:</label>
        <input name="testName" value={form.testName} onChange={handleChange} />
      </div>
      <div>
        <label>Experimenter Name:</label>
        <input name="experimenterName" value={form.experimenterName} onChange={handleChange} />
      </div>
      <div>
        <label>Animal Number:</label>
        <input name="animalNumber" value={form.animalNumber} onChange={handleChange} />
      </div>
      <div>
        <label>Experiment Date:</label>
        <input
          type="date"
          name="experimentDate"
          value={form.experimentDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Experiment Time:</label>
        <input
          type="time"
          name="experimentTime"
          value={form.experimentTime}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Start Experiment</button>
    </form>
  );
};

export default FormPage;
