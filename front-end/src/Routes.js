import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Login from './pages/login.js';
import Main from './pages/main.js';
import Reserva from './pages/Reserva.js';
import Cadastro from './pages/cadastroChaves.js';
import MostraChave from './pages/mostraChaves.js';
import PaginaDeSolicitacao from './pages/solicitacao.js';
import Adm from './pages/adm-page.js';
import Perfil from '../src/pages/perfil.js';
import PedidosProf from './pages/pedidosProf.js';

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/reserva" element={<Reserva />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/mostraChave" element={<MostraChave />} />
      <Route path="/solicitacao" element={<PaginaDeSolicitacao />} />
      <Route path="/adm" element={<Adm />} />
      <Route path="/perfil" element={<Perfil/>}/>
      <Route path="/pedidos" element={<PedidosProf/>}/>
    </RouterRoutes>

  );
}

export default Routes;
