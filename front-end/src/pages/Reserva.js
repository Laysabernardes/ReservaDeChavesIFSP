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

  const { userData } = useUser();
  const nomeDoUsuario = userData ? userData.nm_solicitante : 'Nome Padrão';
  const cargoDoUsuario = userData ? userData.cd_cargo : 'Cargo Padrão';

  const { state } = location || {};
  const chave = state ? state.chave : null;
  const user = state ? state.user : null;

  const [situacao, setSituacao] = useState(chave ? chave.ds_status : '');
  const [codigoPermissao, setCodigoPermissao] = useState('');
  const [data, setData] = useState('');

  console.log('RESERVA - Nome do usuáriooo:', user ? user.nm_solicitante : 'N/A');
  console.log('RESERVA - Cargoo', cargoDoUsuario);
  console.log('RESERVA - ds_chave:', chave ? chave.ds_chave : 'N/A');
  console.log('RESERVA - cd_chave:', chave ? chave.cd_chave : 'N/A');
  console.log('RESERVA - nm_chave:', chave ? chave.nm_chave : 'N/A');
  console.log('RESERVA - ds_status:', chave ? chave.ds_status : 'N/A');

  const handleReservarSala = async (e) => {
    e.preventDefault();
  
    try {
      if (!user) {
        console.error('Usuário não encontrado.');
        return;
      }
  
      const dt_reserva = new Date().toISOString().split('T')[0];
      const ds_status = situacao;
      let cd_permissao_estudante = codigoPermissao || null; // Defina como '000' se não for definido
  
      const payload = {
        cd_solicitante: user.cd_solicitante,
        cd_cargo: user.cd_cargo,
        cd_permissao_estudante: cd_permissao_estudante,
        cd_chave: chave.cd_chave,
        dt_reserva: data,
        dt_devolucao: dt_reserva,
        ds_status: 'solicitacao0',
        ds_tempo_entrega: '01:00'
      };
  
      if (user.cd_cargo === 'A0001') {
        // Adicione um campo para o código de permissão
        if (!codigoPermissao) {
          console.error('ID da permissão não fornecido.');
          return;
        }
  
        try {
          // Verifique se a permissão existe
          const responsePermissao = await api.get(`/solicitacao/${codigoPermissao}`);
          console.log(responsePermissao.data);
  
          // Se a permissão existe, permitir a reserva
          payload.cd_permissao = codigoPermissao;
  
          const response = await api.post('/reserva', payload);
          console.log('Reserva bem-sucedida:', response.data);
  
          navigate('/solicitacao', { state: { chave: response.data } });
        } catch (error) {
          // Se a permissão não existe, exibir mensagem de erro
          console.error('Permissão não encontrada:', error);
        }
      } else {
        // Se o usuário não é da categoria A0001, faça a reserva diretamente
        const response = await api.post('/reserva', payload);
        console.log('Reserva bem-sucedida:', response.data);
  
        navigate('/solicitacao', { state: { chave: response.data } });
      }
    } catch (error) {
      console.error('Erro ao reservar sala:', error.message);
    }
  };
  


  return (
    <div>
      <Header />
      <section className="sessao__chave">
        <div className="chave container" data-chave="">
          <img className="chave__imagem" src="https://www.pontoxtecidos.com.br/static/567/sku/155904889647122.jpg" alt="Imagem da chave" />
          <div className="chave__info">
            <div className="chave__info__descricao">
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

                    {/* ... (seu código anterior) */}
                    {user.cd_cargo === 'A0001' && (
                      <div className="formulario-login__input-container">
                        <input
                          name="codigoPermissao"
                          id="codigoPermissao"
                          className="input inputs"
                          type="text"
                          placeholder="Código de Permissão"
                          required
                          value={codigoPermissao}
                          onChange={(e) => setCodigoPermissao(e.target.value)}
                        />
                        <label className="input-label" htmlFor="codigoPermissao">
                          Código de Permissão:
                        </label>
                        <span className="input-message-error">
                          Este campo não é válido
                        </span>
                      </div>
                    )}

                    <div id="previsao" className="formulario-login__input-container">
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
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ReservaForm;
