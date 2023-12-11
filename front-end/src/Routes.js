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
import PedidosEstudante from './pages/pedidosEstudante.js';
import PedidosAdm from './pages/pedidosAdm.js';
import CadastroUser from './pages/cadastroUsuario.js';
import AcompanharPedidos from './pages/acompanharPedidosReserva.js';
import DeletarChave from './pages/deletarChave.js';
import DeletarUser from './pages/deletarUsuario.js';
import Deletar from './pages/deletar.js';

import { PrivateRoute } from './PrivateRoute.js';
import { AccessProfessor } from './AccessProfessor.js';
import { AccessAdm } from './AccessAdm.js';


function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<PrivateRoute><Main /></PrivateRoute>} />
      <Route path="/reserva" element={<PrivateRoute><Reserva /></PrivateRoute>} />
      <Route path="/acompanharPedidos" element={<PrivateRoute><AcompanharPedidos/></PrivateRoute>}></Route>
      <Route path="/cadastro" element={<PrivateRoute><AccessAdm><Cadastro /></AccessAdm></PrivateRoute>} />
      <Route path="/mostraChave" element={<PrivateRoute><MostraChave /></PrivateRoute>} />
      <Route path="/solicitacao" element={<PrivateRoute><PaginaDeSolicitacao /></PrivateRoute>} />
      <Route path="/adm" element={<PrivateRoute><AccessAdm><Adm /></AccessAdm></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil/></PrivateRoute>}/>
      <Route path="/pedidos" element={<PrivateRoute><AccessProfessor><PedidosProf/></AccessProfessor></PrivateRoute>}/>
      <Route path="/pedidosEstudante" element={<PrivateRoute><PedidosEstudante/></PrivateRoute>}/>
      <Route path="/pedidosAdm" element={<PrivateRoute><AccessAdm><PedidosAdm/></AccessAdm></PrivateRoute>}/>
      <Route path="/cadastrouser" element={<PrivateRoute><AccessAdm><CadastroUser/></AccessAdm></PrivateRoute>}/>
      <Route path="/deletarChave" element={<PrivateRoute><AccessAdm><DeletarChave /></AccessAdm></PrivateRoute>} />
      <Route path="/deletarUser" element={<PrivateRoute><AccessAdm><DeletarUser /></AccessAdm></PrivateRoute>} />
      <Route path="/deletar" element={<PrivateRoute><AccessAdm><Deletar /></AccessAdm></PrivateRoute>} />
    </RouterRoutes>

  );
}

export default Routes;
