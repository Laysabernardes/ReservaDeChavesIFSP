import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Login from './pages/login.js';
import Main from './pages/main.js';

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </RouterRoutes>
  );
}

export default Routes;
