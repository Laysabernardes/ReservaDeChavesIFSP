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
  const [horariosReservados, setHorariosReservados] = useState([]);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [horarioInicial, setHorarioInicial] = useState([]);
  const [horarioFinal, setHorarioFinal] = useState([]);
  const [horariosSelecionadosEntreInicialEFinal, setHorariosSelecionadosEntreInicialEFinal] = useState([]);

  const [horariosDisponiveisByData, setHorariosDisponiveisByData] = useState([]);
  const [horariosDisponiveisSegundoSelect, setHorariosDisponiveisSegundoSelect] = useState([]);

  const [data, setData] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData'));

  const matricula = userData.cd_matricula_usuario;
  console.log('nosdg', matricula);


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
      return permissao.id_permissao;
      // setCodigoPermissao(permissao.id_permissao);
    } catch (error) {
      console.error('Erro ao verificar permissão para reserva:', error);
      setMensagem(`Erro ao verificar permissão para reserva. Tente novamente mais tarde.`);
    }
  };

// const setarDetalhesReserva = async (idReserva, dtReserva) => {
//   // Criar um payload para os detalhes da reserva
//   const detalhesPayload = {
//     id_reserva: idReserva,
//     horarios_reservados: "15:30",
//     dt_reserva: dtReserva,
//   };

//   // Log para verificar o payload antes de enviar
//   console.log('Detalhes payload:', detalhesPayload);

//   // Enviar uma solicitação POST para a API para adicionar detalhes à reserva
//   const detalhesResponse = await api.post('/reserva/detalhes', detalhesPayload);
//   console.log('Detalhes da reserva adicionados:', detalhesResponse.data);

// }

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

      // verificarPermissaoReserva(user.cd_matricula_usuario, chave.cd_chave);

      if (!permitir) {
        setMensagem('Permissão negada. Não é possível fazer a reserva.');
        return;
      }

      // if (permitir === true) {
        let codigoPermissao = null;
      //   return;
      // }

      // Verifica se o usuário tem o cargo A0001 (categoria Aluno)
      if (user.cd_cargo === 'A0001') {
       const codigo =  verificarPermissaoReserva(userData.cd_matricula_usuario, chave.cd_chave);
       setCodigoPermissao(codigo);
      }
      else{
        setCodigoPermissao(null);
      setpermitir(true);
      }

      const payload = {
        cd_matricula_solicitante: userData.cd_matricula_usuario,
        cd_cargo: user.cd_cargo,
        id_permissao_estutante:  codigoPermissao,
        cd_chave: chave.cd_chave,
        dt_reserva: dataSelecionada,
        dt_devolucao: new Date().toISOString().split('T')[0],
        ds_status: 'SOLICITANDO',
        hr_reserva: JSON.stringify(horariosSelecionadosEntreInicialEFinal)
      };

      console.log('tudi', payload);

      try {
        // Envia uma solicitação POST para a API para criar a reserva
        const response = await api.post('/reserva', payload);
        console.log('Reserva bem-sucedida:', response.data);
        setMensagem('Solicitação de reserva enviada, acompanhe em:');

        const idReserva = response.data.reserva.id_reserva;
        const dtReserva = response.data.reserva.dt_reserva;
        console.log('Reserva:', response.data.reserva);
        console.log('Resposta completa:', response.data);

        console.log('ID da reserva:', idReserva);


        // //CHAMAR FUNÇÃO do DETALHES:
        // setarDetalhesReserva(idReserva, dtReserva)

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
  "-", "07:15", "08:00", "08:45", "09:30", "09:45", "10:30", "11:15",
  "13:15", "14:00", "14:45", "15:45", "16:30", "17:15", "18:00",
  "19:00", "19:45", "20:30", "21:30", "22:15"
];

// Função para lidar com a reserva dos horários selecionados
const handleReservar = () => {
  // Adicione aqui a lógica para reservar os horários selecionados, se necessário
  console.log('Horários selecionados para reserva:', horariosSelecionados);
  if (horariosSelecionados.some(horario => horariosReservados.includes(horario))) {
    setMensagem('O horário selecionado não está disponível. Por favor, escolha outro horário.');
    return;
  }
};

const identificarHorariosDisponiveisByData = async (data) => {
  try{
    const response = await api.get(`/reserva/detalhes/${data}`);
    const arrayHorarios = [];
    
    if (response.data && response.data.data && Array.isArray(response.data.data.detalhes)) {
      const detalhesArray = response.data.data.detalhes;
      
      detalhesArray.forEach(detalhe => {
        // Aqui você pode fazer o que deseja com cada item do array detalhes
        console.log("Cada detalhe:", detalhe); // Exemplo: Exibir cada detalhe no console
        const hr_reserva_Array = JSON.parse(detalhe.hr_reserva)
        arrayHorarios.push(...hr_reserva_Array);   
      });

    } else {
      console.log('Array "detalhes" não encontrado em response.data.data');
    }
    
    setHorariosDisponiveisByData(arrayHorarios);
  } catch(error){
    console.error('Erro ao buscar horarios disponiveis pela data:', error);
  }
} 

// Função para lidar com a mudança na data
const handleDateChange = (event) => {
  setDataSelecionada(event.target.value);
  identificarHorariosDisponiveisByData(event.target.value);
};


// Função para identificar os horários entre o horário inicial e final selecionados
const identificarHorariosSelecionados = (horaInicial, horaFinal) => {
  const indiceInicial = todosOsHorarios.indexOf(horaInicial);
  const indiceFinal = todosOsHorarios.indexOf(horaFinal);

  if (indiceInicial !== -1 && indiceFinal !== -1 && indiceInicial < indiceFinal) {
    const horariosEntre = todosOsHorarios.slice(indiceInicial - 1, indiceFinal + 1);
    ////////////////////////////
    setHorariosSelecionadosEntreInicialEFinal(horariosEntre);
    ///////////////////////////
  } else {
    setHorariosSelecionadosEntreInicialEFinal([]);
  }
};

// Função para lidar com a mudança em ambos os selects de horas (hora inicial e final)
const handleHoraChange = (event, isHoraInicial) => {
  const horaInicialSelecionada = isHoraInicial ? event.target.value : horariosDisponiveisSegundoSelect[0]; 
  // Se for o primeiro select, pega o valor dele; senão, pega o valor do segundo select
  const horaFinalSelecionada = isHoraInicial ? horariosDisponiveisSegundoSelect[0] : event.target.value; 
  // Se for o primeiro select, pega o valor do segundo select; senão, pega o valor dele


  setHorarioInicial(horaInicialSelecionada);
  setHorarioFinal(horaFinalSelecionada);

  identificarHorariosSelecionados(horaInicialSelecionada, horaFinalSelecionada);

  if (isHoraInicial) {
    const horasDisponiveisSegundoSelect = todosOsHorarios.filter(horario => horario > horaInicialSelecionada);
    setHorariosDisponiveisSegundoSelect(horasDisponiveisSegundoSelect);
  }
};

// console.log(identificarHorariosSelecionados(horarioInicial, horarioFinal));

// console.log('no dia', dataSelecionada);
// console.log('das', horarioInicial);
// console.log('até às', horarioFinal);
// console.log('total de horas:', horariosSelecionadosEntreInicialEFinal)
console.log("Estes são os horários disponiveis desse dia:", horariosDisponiveisByData);


useEffect(() => {
  if (userData) {
    if(userData.cd_cargo ==='A0001'){
      verificarPermissaoReserva(userData.cd_matricula_usuario, chave.cd_chave);
    }else{
      userData.cd_permissao=null;
      setpermitir(true);
    }
    
  }
  console.log("DIA SELECIONADO É: ", dataSelecionada)
  console.log("type: ", typeof(dataSelecionada))
  console.log("Horarios Disponiveis do dia É: ", horariosDisponiveisByData)
  console.log("type: ", typeof(horariosDisponiveisByData))

}, [userData, chave, matricula]);

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

                  {/* Captura a hora inicial */}
                  <div className='formulario-approved__input-container'>
                    <label for="select-horario1" className='input-label'>Horário inicial:</label>
                    <select name="select-horario1" className="input inputs" required 
                    onChange={(e) => handleHoraChange(e, true)}>
                      {todosOsHorarios.map(horario => (
                          <option
                            id={horario}
                            value={horario}
                          >{horario}</option>
                      ))}
                    </select>
                  </div>
                  {/* Captura a hora final */}
                  <div className='formulario-approved__input-container'>
                    <label htmlFor="select-horario2" className='input-label'>Horário final:</label>
                    <select name="select-horario2" className="input inputs" required
                     onChange={(e) => handleHoraChange(e, false)}>
                      {horariosDisponiveisSegundoSelect.map(horario => (
                        <option key={horario} value={horario}>{horario}</option>
                      ))}
                    </select>
                  </div>                
                    {/* Botão para reservar os horários selecionados */}
                    {/* <button onClick={handleReservar}>Reservar</button>*/}
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