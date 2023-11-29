import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Login from './pages/login.js';
import Main from './pages/main.js';
import Reserva from './pages/Reserva.js';
import Cadastro from './pages/cadastroChaves.js';
import MostraChave from './pages/mostraChaves.js';
import PaginaDeSolicitacao from './pages/solicitação.js';

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/reserva" element={<Reserva />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/mostraChave" element={<MostraChave />} />
      <Route path="/solicitacao" element={<PaginaDeSolicitacao />} />
    </RouterRoutes>

  );
}

export default Routes;
