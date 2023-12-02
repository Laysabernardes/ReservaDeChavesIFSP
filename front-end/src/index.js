import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importe BrowserRouter ou HashRouter
import { UserProvider } from './UserContext.js';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './Routes.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes />
      </UserProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
