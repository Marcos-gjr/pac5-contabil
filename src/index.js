import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './componentes/styles/Login.css';
import Login from './componentes/pages/Login';
import './componentes/styles/Header.css';
import Header from './componentes/pages/Header';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();