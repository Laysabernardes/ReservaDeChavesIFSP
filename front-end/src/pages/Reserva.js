// Importando as bibliotecas e componentes necessários do React e do React Router
import React, { useState } from 'react';
import { useUser } from '../UserContext.js';
import { useNavigate, useLocation } from 'react-router-dom';
// Importando a API e componentes adicionais
import api from '../api';
import Header from './header.js';
import Footer from './footer.js';
// Importando os estilos CSS
import '../css/reset.css';
import '../css/index.css';
import '../css/login.css';
import '../css/Reserva.css';

// Componente principal que representa o formulário de reserva
//props são os dados da reserva passados para a função.
function ReservaForm(props) {
  // Hooks do React para gerenciar o estado e a navegação
  //Hooks são funções que gerenciam estado e navegação.
  const navigate = useNavigate();
  //useNavigate() é um hook que retorna uma função que pode ser usada para navegar para uma nova página
  const location = useLocation();
  //useLocation() é um hook que retorna um objeto que contém informações sobre a página atual.

  // Obtendo dados da localização (URL)
  const { state } = location || {};
  const chave = state ? state.chave : null;
  const user = state ? state.user : null;
  
  // Hooks de estado para gerenciar dados do formulário
  const [situacao, setSituacao] = useState(chave ? chave.ds_status : '');
  const [codigoPermissao, setCodigoPermissao] = useState('');
  const [data, setData] = useState('');

  // Exibindo informações no console para depuração
  console.log('RESERVA - Nome do usuário:', user ? user.nm_solicitante : 'N/A');
  console.log('RESERVA - ds_chave:', chave ? chave.ds_chave : 'N/A');
  console.log('RESERVA - cd_chave:', chave ? chave.cd_chave : 'N/A');
  console.log('RESERVA - nm_chave:', chave ? chave.nm_chave : 'N/A');
  console.log('RESERVA - ds_status:', chave ? chave.ds_status : 'N/A');

  // Função assíncrona para lidar com a reserva
  const handleReservarSala = async (e) => {
    //e.preventDefault() cancela a ação padrão do evento
    e.preventDefault();
  
    try {
      // Verifica se o usuário está presente
      if (!user) {
        console.error('Usuário não encontrado.');
        return;
      }
      // Obtém a data atual para a reserva
      const dt_reserva = new Date().toISOString().split('T')[0];
      
      // Define cd_permissao_estudante como null se não estiver definido
      let cd_permissao_estudante = codigoPermissao || null; 
  
      // Cria um payload com os dados da reserva
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
  
      // Verifica se o usuário tem o cargo A0001 (categoria Aluno)
      if (user.cd_cargo === 'A0001') {
        // Adiciona um campo para o código de permissão
        if (!codigoPermissao) {
          console.error('ID da permissão não fornecido.');
          return;
        }
  
        try {
          //
          // Verifique se a permissão existe
          const responsePermissao = await api.get(`/solicitacao/${codigoPermissao}`);
          console.log(responsePermissao.data);
  
          // Se a permissão existe, permitir a reserva
          payload.cd_permissao = codigoPermissao;

          // Envia uma solicitação POST para a API para criar a reserva
          const response = await api.post('/reserva', payload);
          console.log('Reserva bem-sucedida:', response.data);
  
          // Navega para a página de solicitação com a chave da reserva
          navigate('/solicitacao', { state: { chave: response.data } });
        } catch (error) {
          // Se a permissão não existe, exibir mensagem de erro
          console.error('Permissão não encontrada:', error);
        }
      } else {
        // Se o usuário não é da categoria A0001, faça a reserva diretamente
        const response = await api.post('/reserva', payload);
        console.log('Reserva bem-sucedida:', response.data);
  
        // Navega para a página de solicitação com a chave da reserva
        navigate('/solicitacao', { state: { chave: response.data } });
      }
    } catch (error) {
      // Exibe mensagem de erro em caso de falha na reserva
      console.error('Erro ao reservar sala:', error.message);
    }
  };
  
  // Renderiza o componente JSX
  return (
    <div>
      {/* Componentes de cabeçalho e rodapé */}
      <Header />
      <section className="sessao__chave">
        <div className="chave container" data-chave="">
          <img className="chave__imagem" src="https://www.pontoxtecidos.com.br/static/567/sku/155904889647122.jpg" alt="Imagem da chave" />
          <div className="chave__info">
            <div className="chave__info__descricao">
              <div className="formulario">
                <div className="formulario-login container">
                  {/* Título do formulário */}
                  <h3 className="formulario-login__titulo">Nome da sala</h3>
                  <form className="formulario-login_form">
                    {/* Campo de entrada para a situação (readonly) */}
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

                    {/* Campo de entrada para o código de permissão (condicional) */}
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

                    {/* Campo de entrada para a data e horário */}
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
                    
                    {/* Botão para reservar a sala */}
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
