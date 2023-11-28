import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Login from './pages/login.js';
import Main from './pages/main.js';
import Reserva from './pages/Reserva.js';
import Cadastro from './pages/cadastroChaves.js';
import MostraChave from './pages/mostraChaves.js';

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
      <Route path="/reserva" element={<Reserva />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/mostraChave" element={<MostraChave />} />
      
    </RouterRoutes>
  );
}

export default Routes;
