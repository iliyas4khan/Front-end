import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://health-dev-challenge-1.onrender.com/bfhl';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post(API_URL, parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>Alphabets: {response.alphabets.join(', ')}</div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>Numbers: {response.numbers.join(', ')}</div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(', ')}</div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ABCD123</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {response && (
        <div className="mb-4">
          <select
            multiple
            value={selectedOptions}
            onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
            className="w-full p-2 border rounded"
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}
