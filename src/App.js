import React, { useState } from 'react';
import './App.css';
const App = () => {
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('question', question);
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('url', text);
    }

    try {
      const response = await fetch('http://localhost:8000/process-input', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }

      const data = await response.json();
      setResult(data.answer);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Process Input</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Question:
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ marginLeft: '10px', width: '300px' }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            URL:
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ marginLeft: '10px', width: '300px' }}
              disabled={file !== null}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            PDF File:
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              disabled={text !== ''}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: '5px 10px' }}>Submit</button>
      </form>
      {result && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>Result</h2>
          <pre className="result-text">{result}</pre>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid red', color: 'red' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
