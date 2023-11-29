import React, { useState } from 'react';
import { useUser } from '../UserContext.js';
import { useNavigate, useLocation } from 'react-router-dom';

import api from '../api';
import Header from './header.js';
import Footer from './footer.js';
import '../css/reset.css';
import '../css/index.css';
import '../css/login.css';
import '../css/Reserva.css';

function ReservaForm(props) {
  const navigate = useNavigate();
  const location = useLocation();

  // const [situacao, setSituacao] = useState('');
  const [data, setData] = useState('');

  const { userData, setUserData, chavesData, setChavesData } = useUser();
  const nomeDoUsuario = userData ? userData.nm_solicitante : 'Nome Padrão';
  const cargoDoUsuario = userData ? userData.cd_cargo : 'Cargo Padrão';

  const { state } = location || {};
  const chave = state ? state.chave : null;

  const [situacao, setSituacao] = useState(chave ? chave.ds_status : '');

  console.log('RESERVA - Nome do usuáriooo:', nomeDoUsuario);
  console.log('RESERVA - Cargoo', cargoDoUsuario);
  console.log('RESERVA - ds_chave:', chave ? chave.ds_chave : 'N/A');
  console.log('RESERVA - cd_chave:', chave ? chave.cd_chave : 'N/A');
  console.log('RESERVA - nm_chave:', chave ? chave.nm_chave : 'N/A');
  console.log('RESERVA - ds_status:', chave ? chave.ds_status: 'N/A');


  const handleReservarSala = async (e) => {
    e.preventDefault();
  
    try {
      // Obtenha as informações adicionais necessárias
      const dt_reserva = new Date().toISOString().split('T')[0]; // Data atual
      const ds_status = 'livre'; // Defina conforme necessário
  
      // Faça a chamada à API para reservar a sala
      const response = await api.post('/reserva', {
        cd_solicitante: nomeDoUsuario,
        cd_cargo: cargoDoUsuario,
        cd_permissao: ' ' , 
        cd_chave: chave.cd_chave,
        dt_reserva: data,
        dt_devolucao: ' ',
        ds_status: situacao,
      });
  
      // Lide com a resposta da API conforme necessário
      console.log('Reserva bem-sucedida:', response.data);
  
      // Redireciona para outra página ou faça o que for necessário após a reserva
      navigate('/pagina-de-sucesso');
    } catch (error) {
      // Lide com erros da API, por exemplo, exibindo uma mensagem de erro
      console.error('Erro ao reservar sala:', error.message);
    }
  };
  

  return (
    <div>
      <Header />
      <section className="sessao__chave">
        <div className="chave container" data-chave="">
        <img className="chave__imagem" src="https://www.pontoxtecidos.com.br/static/567/sku/155904889647122.jpg" alt="Imagem da chave"></img>
          <div className="chave__info">
            <h2 className="chave__info__titulo"></h2>
            <p className="chave__info__descricao">
              <div className="formulario">
                <div className="formulario-login container">
                  <h3 className="formulario-login__titulo">Nome da sala</h3>
                  <form className="formulario-login_form">
                    <div className="formulario-login__input-container">
                      <input
                        name="situacao"
                        id="situacao"
                        className="input inputs"
                        type="text"
                        placeholder="Situação"
                        required
                        data-tipo="situacao"
                        value={situacao}
                        onChange={(e) => setSituacao(e.target.value)}
                        readOnly
                      />
                      <label className="input-label" htmlFor="situacao">
                        Situação:
                      </label>
                      <span className="input-message-error">
                        Este campo não é válido
                      </span>
                    </div>
                    <div
                      id="previsao"
                      className="formulario-login__input-container"
                    >
                      <input
                        name="data"
                        id="data"
                        className="input inputs input-contraseña"
                        type="datetime-local"
                        placeholder="date"
                        required
                        data-tipo="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                      />
                      <label className="input-label" htmlFor="data">
                        Data e Horário:
                      </label>
                      <span className="input-message-error">
                        Este campo não é válido
                      </span>
                    </div>
                    <button
                      className="boton-formulario-login"
                      onClick={handleReservarSala}
                    >
                      Reservar Sala
                    </button>
                  </form>
                </div>
              </div>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ReservaForm;
