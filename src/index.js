import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function HelloWorld(){
  const[message, setMessage] = useState('Hello, World');
  const handleClick = async() => {
    try{
      const response = await fetch("http://127.0.0.1:8000/hello")
      const data = await response.json();
      console.log('Fetched message:', data.message);
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching the message', error);
    }

  };

  return (
  
    <div className="test">
      <button className="greeting" onClick = {handleClick}>Click me</button>
      <p>
      {message}
      
      </p>

    </div>

  
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
