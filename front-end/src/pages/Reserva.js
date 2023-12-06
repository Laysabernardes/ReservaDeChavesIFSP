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
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [horariosReservados, setHorariosReservados] = useState([]);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);

  const [data, setData] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData'));

  const matricula = userData.cd_matricula_usuario;
  console.log('nosdg', matricula);

  useEffect(() => {
    if (userData) {
      verificarPermissaoReserva(userData.cd_matricula_usuario, chave.cd_chave);
    }
  }, [userData, chave, matricula]);


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

      verificarPermissaoReserva(user.cd_matricula_usuario, chave.cd_chave);

      if (!permitir) {
        setMensagem('Permissão negada. Não é possível fazer a reserva.');
        return;
      }

      // Criar um payload com os dados da reserva
      const payload = {
        cd_matricula_usuario: user.cd_solicitante,
        cd_cargo: user.cd_cargo,
        cd_chave: chave.cd_chave,
        dt_reserva: dataSelecionada,
        dt_devolucao: new Date().toISOString().split('T')[0],
        ds_status: 'SOLICITADO',
      };

      if (permitir === true) {
        payload.cd_permissao = codigoPermissao;
        return;
      }

      // Verifica se o usuário tem o cargo A0001 (categoria Aluno)
      if (user.cd_cargo === 'A0001') {
        payload.cd_permissao_estudante = codigoPermissao || null;
      }
      try {
        // Envia uma solicitação POST para a API para criar a reserva
        const response = await api.post('/reserva', payload);
        console.log('Reserva bem-sucedida:', response.data);
        setMensagem('Solicitação de reserva enviada, acompanhe em:')

        // Obter o ID da reserva recém-criada
        const idReserva = response.data.id_reserva;
        // Criar um payload para os detalhes da reserva
        const detalhesPayload = {
          id_reserva: idReserva,
          horarios_reservados: horariosSelecionados,
        };
        // Enviar uma solicitação POST para a API para adicionar detalhes à reserva
        const detalhesResponse = await api.post('/reserva/detalhes', detalhesPayload);
        console.log('Detalhes da reserva adicionados:', detalhesResponse.data);

        // navigate('/solicitacao', { state: { chave: response.data } });
      } catch (error) {
        console.error('Erro ao criar reserva:', error);
        setMensagem('ERRO: Solicitação de reserva não criada, tente novamente!')
      }
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    setMensagem('ERRO: Solicitação de reserva não criada, tente novamente!')
  }
};

const todosOsHorarios = [
  '07:15', '08:00', '08:45', '09:30', '09:45', '10:30', '11:15',
  '13:15', '14:00', '14:45', '15:45', '16:30', '17:15', '18:00',
  '19:00', '19:45', '20:30', '21:30', '22:15'
];

// Função para filtrar os horários disponíveis com base na data selecionada
const obterHorariosDisponiveis = (dataSelecionada, chave) => {
  // Adicione aqui a lógica para obter os horários reservados para a data selecionada, se necessário
  // Por enquanto, retornaremos todos os horários, pois não temos essa lógica implementada ainda
  return todosOsHorarios;
};

//LOGICA COM ERRO
// const obterHorariosDisponiveis = async (dataSelecionada) => {
//   try {
//     // Chama a API para obter os detalhes das reservas para a data
//     const response = await api.get('/reserva/detalhes/data', { params: { 'dt_reserva': dataSelecionada } });

//     // Verifica se a resposta possui detalhes
//     if (!response.data || typeof response.data !== 'object' || !response.data.detalhes || !Array.isArray(response.data.detalhes)) {
//       console.error('Resposta inválida:', response.data);
//       return [];
//     }

//     // Extrai os horários reservados da resposta
//     const horariosReservados = response.data.detalhes.map(detalhe => detalhe.horario_reservado);

//     // Filtra os horários disponíveis
//     const horariosDisponiveis = todosOsHorarios.filter(horario => {
//       // Verifica se o horário está reservado para a data selecionada
//       return !horariosReservados.includes(horario);
//     });

//     return horariosDisponiveis;
//   } catch (error) {
//     console.error('Erro ao obter horários disponíveis:', error);
//     // Trate o erro de acordo com sua lógica de aplicação
//     return [];
//   }
// };



// Função para lidar com a reserva dos horários selecionados
const handleReservar = () => {
  // Adicione aqui a lógica para reservar os horários selecionados, se necessário
  console.log('Horários selecionados para reserva:', horariosSelecionados);
  if (horariosSelecionados.some(horario => horariosReservados.includes(horario))) {
    setMensagem('O horário selecionado não está disponível. Por favor, escolha outro horário.');
    return;
  }
};

// Função para lidar com a mudança na data
const handleDateChange = (event) => {
  setDataSelecionada(event.target.value);
};

console.log('das',dataSelecionada);

// Função para lidar com a mudança nos checkboxes dos horários
const handleCheckboxChange = (event) => {
  const horarioSelecionado = event.target.value;

  if (horariosSelecionados.includes(horarioSelecionado)) {
    // Desselecionar o horário
    setHorariosSelecionados(horariosSelecionados.filter(horario => horario !== horarioSelecionado));
  } else {
    // Selecionar o horário
    setHorariosSelecionados([...horariosSelecionados, horarioSelecionado]);
  }

  // Mostrar os checkboxes selecionados em tempo real no console
  console.log('Checkboxes selecionados:', horariosSelecionados);
};
// Obter os horários disponíveis com base na data selecionada
const horariosDisponiveis = obterHorariosDisponiveis();


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

                    <input type="date" onChange={handleDateChange} />
                    {horariosDisponiveis.map(horario => (
                      <div key={horario}>
                        <input
                          type="checkbox"
                          id={horario}
                          value={horario}
                          checked={horariosSelecionados.includes(horario)}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={horario}>{horario}</label>
                      </div>
                    ))}
                    {/* Botão para reservar os horários selecionados */}
                    <button onClick={handleReservar}>Reservar</button>
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