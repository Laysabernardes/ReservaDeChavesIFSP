import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importe BrowserRouter ou HashRouter
import { UserProvider } from './UserContext.js';
import './css/index.css';
// import Login from './pages/login.js'
import reportWebVitals from './reportWebVitals';
import Routes from './Routes.js'

<<<<<<< HEAD
import LoginForm from './pages/login.js';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>      
        <LoginForm />
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes />
      </UserProvider>
>>>>>>> 4f7b46a0ac581f4f1cfea316fbb1050124407569
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
