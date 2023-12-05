// Importando as bibliotecas e componentes necessários do React e do React Router
import React, { useState, useEffect } from 'react';
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
  // const [armazena o valor, usado para alterar o valor] ...
  const [situacao, setSituacao] = useState(chave ? chave.ds_status : '');
  const [codigoPermissao, setCodigoPermissao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [permitir, setpermitir] = useState(false);
  const [data, setData] = useState('');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const matricula = userData.cd_matricula_usuario;
  console.log('nosdg', matricula);

  useEffect(() => {
    if (userData) {
      verificarPermissaoReserva(userData.cd_matricula_usuario, chave.cd_chave);
    }
  }, [userData, chave, matricula]);

  // Função assíncrona para lidar com a reserva
  const handleReservarSala = async (e) => {
    //e.preventDefault() cancela a ação padrão do evento
    e.preventDefault();

    verificarPermissaoReserva(matricula, chave.cd_chave);

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
        cd_matricula_usuario: user.cd_solicitante,
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
        verificarPermissaoReserva(user.cd_matricula_usuario, chave.cd_chave);
        // Adiciona um campo para o código de permissão
        if (permitir === true) {
          payload.cd_permissao = codigoPermissao;
          return;
        }
        try {

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

  const verificarPermissaoReserva = async (matricula, cdChaveDesejada) => {
    try {
      const response = await api.get(`/permissao/estudante/${matricula}`);
      const dadosPermissao = response.data;
  
      if (dadosPermissao.pedidos.length === 0) {
        setMensagem(`Aluno, você não tem permissões associadas a este local. Faça o pedido a um professor!`);
        return setpermitir(false);
      }
  
      const permissao = dadosPermissao.pedidos[0];
  
      if (permissao.cd_chave !== cdChaveDesejada) {
        setMensagem(`Aluno, você não tem permissão para reservar essa chave. Faça o pedido a um professor!`);
        return setpermitir(false);
      }
  
      if (permissao.ds_status !== 'ACEITO') {
        setMensagem(`Aluno, sua permissão não foi aprovada. Verifique seu pedido!`);
        return setpermitir(false);
      }
  
      if (!permissao.id_permissao) {
        setMensagem(`Aluno, seu código de permissão é inválido. Verifique seu pedido!`);
        return setpermitir(false);
      }
  
      setpermitir(true);
      setMensagem('Permissão de reserva aprovada pelo professor!');
      setCodigoPermissao(permissao.id_permissao);
    } catch (error) {
      console.error('Erro ao verificar permissão para reserva:', error);
      setMensagem(`Erro ao verificar permissão para reserva. Tente novamente mais tarde.`);
    }
  };
  
  // Renderiza o componente JSX
  return (
    <div>
      {/* Componentes de cabeçalho e rodapé */}
      <Header />
      <section className="sessao__chave">
      <div className='container_botao'>
            <a className="local_botao" href="/main"
              onClick={(e) => {
                e.preventDefault();
                navigate('/main', { state: { user: userData } })
              }}>Voltar:</a>
          </div>
        <div className="chave container" data-chave="">
          <div className="chave__info">
            <div className="chave__info__descricao">
              <div className="formulario">
                <div className="formulario-login container">
                  <form className="formulario-login_form">

                    {/* Título do formulário */}
                  <h3 className="titulo">Reservar: {chave.nm_chave}</h3>
                  <div className='container-mensagem'>
                    {mensagem && <p className='mensagem_reserva'>{mensagem}</p>}
                    {permitir === false && (
                      <button
                        className="boton-formulario-login"
                        onClick={() => {
                          setTimeout(() => {
                            navigate('/pedidos');
                          }, 100);
                        }}
                      >
                        faça o pedido
                      </button>
                    )}
                  </div>

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