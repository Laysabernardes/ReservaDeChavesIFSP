// Importa os módulos necessários do React 
import React, { useState, useEffect } from 'react';
// Importa o hook personalizado useUser do contexto de usuário
import { useUser } from '../UserContext.js';
// Importa hooks de navegação do React Router
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate

// Importa componentes de cabeçalho e rodapé
import Header from './header';
import Footer from './footer';

// Importa a instância configurada do Axios do arquivo api.js
import api from '../api';

// Importa os estilos para esta página
import '../css/reset.css';
import '../css/index.css';
import '../css/PedidosProf.css';
import '../css/PedidosEstudante.css';
import '../css/adm-page.css';

// Componente funcional PedidosEstudante
function PedidosEstudante() {

  // Estados para armazenar informações de pedidos e outros estados necessários
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);
  const [solicitacoesAceitas, setSolicitacoesAceitas] = useState([]);
  const [solicitacoesRecusadas, setSolicitacoesRecusadas] = useState([]);
  const [temSolicitacoesPendentes, setTemSolicitacoesPendentes] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [prof, setProf] = useState('');
  const [local, setLocal] = useState('');

  // Obtém a função navigate do React Router para redirecionamento
  const navigate = useNavigate();
  const location = useLocation();

  // const userData = location.state ? location.state.userData : null;
  // console.log('Dados do Usuário em pedidos:', userData);

  // Obtém dados do usuário do armazenamento local (localStorage)
  const userData = JSON.parse(localStorage.getItem('userData'));

  // Define o prontuário e o nome do usuário com base nos dados do usuário, se disponíveis
  const prontuario = userData ? userData.cd_matricula_usuario : 'N/A';
  const userName = userData ? userData.nm_usuario : 'Usuário';

  // Função para buscar o nome do estudante com base na matrícula
  //Argumentos:matricula: Matrícula do estudante a ser buscado
  // Retorno: O nome do estudante, ou Nome não encontrado se o estudante não for encontrado
  // Função para buscar o nome do estudante com base na matrícula
  const buscarNomeProf = async (matricula) => {
    // Tentativa de fazer a chamada à API
    try {
      // Faz uma chamada à API, passando a matrícula como parâmetro
      const response = await api.get(`/user/nome/${matricula}`);
      // Obtém os dados da resposta da API
      const dadosProfessor = response.data;
      // Verifica se a resposta da API contém dados do usuário
      if (dadosProfessor.usuario && dadosProfessor.usuario.length > 0) {
        // Obtém o nome do estudante
        const nomeprofessor = dadosProfessor.usuario[0].nm_usuario;
        // Imprime o nome do estudante
        console.log("nome:", nomeprofessor);
        // Retorna o nome do estudante
        return nomeprofessor;
      } else {
        // Erro: a resposta da API não contém dados do usuário
        console.error('Resposta da API não contém dados de usuário:', dadosProfessor);
        // Retorna 'Nome não encontrado'
        return 'Nome não encontrado';
      }
    } catch (error) {
      // Erro ao fazer a chamada à API
      console.error('Erro ao buscar nome do Professor:', error);
      // Retorna 'Nome não encontrado'
      return 'Nome não encontrado';
    }
  };

  //É uma Função para buscar informações de uma chave
  //Argumentos:cd_chave: Código da chave a ser buscada
  //Retorno:Um objeto com as informações da chave, ou null se a chave não for encontrada
  const buscarInformacoesChave = async (cd_chave) => {
    // Tentativa de fazer a chamada à API
    try {
      // Faz uma chamada à API, passando o código da chave como parâmetro
      const response = await api.get(`/chaves/${cd_chave}`);
      // Obtém os dados da resposta da API
      const dadosChave = response.data;

      // Verifica se a resposta da API contém dados da chave
      if (dadosChave.chave && dadosChave.chave.length > 0) {
        // Imprime o nome e a categoria da chave
        console.log("Chave:", dadosChave.chave[0].nm_chave);
        console.log("Categoria:", dadosChave.chave[0].ds_chave);
        // Retorna o objeto com as informações da chave
        return dadosChave.chave[0];
      } else {
        // Erro: a resposta da API não contém dados da chave
        console.error('Resposta da API não contém dados da chave:', dadosChave);
        // Retorna `null`
        return null;
      }
    } catch (error) {
      // Erro ao fazer a chamada à API
      console.error('Erro ao buscar informações da chave:', error);
      return null;
    }
  };

  // Função para buscar as solicitações no banco de dados
  // Função para buscar as solicitações no banco de dados
  const buscarSolicitacoes = async () => {
    // Tentativa de fazer a chamada à API
    try {
      // Faz uma chamada à API, passando o prontuário do estudante como parâmetro
      const response = await api.get(`/permissao/estudante/${prontuario}`);
      // Obtém os dados da resposta da API
      const dadosDaAPI = response.data;
      // Verifica se a resposta da API contém um array de solicitações
      if (dadosDaAPI.pedidos && Array.isArray(dadosDaAPI.pedidos)) {

        // Cria três arrays para armazenar as solicitações pendentes, aceitas e recusadas
        const pendentes = [];
        const aceitas = [];
        const recusadas = [];

        // Itera sobre as solicitações da resposta da API
        for (const solicitacao of dadosDaAPI.pedidos) {
          // Chama a função `buscarNomeEstudante()` para obter o nome do estudante
          const nomeprofessor = await buscarNomeProf(solicitacao.cd_matricula_funcionario);
          // Atualiza o objeto `solicitacao` com o nome do estudante
          solicitacao.nomeprofessor = nomeprofessor;
          // Chama a função `buscarInformacoesChave()` para obter as informações da chave
          const informacoesChave = await buscarInformacoesChave(solicitacao.cd_chave);
          // Se as informações da chave forem encontradas, atualiza o objeto `solicitacao` com as informações da chave
          if (informacoesChave) {
            solicitacao.nomeChave = informacoesChave.nm_chave;
            solicitacao.categoriaChave = informacoesChave.ds_chave;
          } else {
            // Se as informações da chave não forem encontradas, atualiza o objeto `solicitacao` com valores padrão
            solicitacao.nomeChave = 'Chave não encontrada';
            solicitacao.categoriaChave = 'Categoria não encontrada';
          }

          // Obtém o ID da permissão
          const idPermissao = solicitacao.id_permissao;
          // Imprime o ID da permissão
          console.log('ID da Permissão:', idPermissao);
          // Classifica a solicitação de acordo com seu status
          if (solicitacao.ds_status === 'SOLICITADO') {
            pendentes.push(solicitacao);
          } else if (solicitacao.ds_status === 'ACEITO') {
            aceitas.push(solicitacao);
          } else if (solicitacao.ds_status === 'RECUSADO') {
            recusadas.push(solicitacao);
          }
        }

        // Atualiza os estados da aplicação com as solicitações encontradas
        setSolicitacoesPendentes(pendentes);
        setSolicitacoesAceitas(aceitas);
        setSolicitacoesRecusadas(recusadas);

        // Atualiza a variável de estado para indicar se há solicitações pendentes
        setTemSolicitacoesPendentes(pendentes.length > 0);

        // Exiba mensagens para categorias sem solicitações
        if (pendentes.length === 0) {
          console.warn('Não há solicitações pendentes disponíveis para processamento.');
        }
        if (aceitas.length === 0) {
          console.warn('Não há solicitações aceitas disponíveis para processamento.');
        }
        if (recusadas.length === 0) {
          console.warn('Não há solicitações recusadas disponíveis para processamento.');
        }
      } else {
        // Erro: os dados da API não contêm um array de solicitações
        console.error('Os dados da API não contêm um array de pedidos:', dadosDaAPI);

        // Se não houver solicitações pendentes, exibe uma mensagem de aviso
        if (!temSolicitacoesPendentes) {
          console.warn('Não há solicitações pendentes disponíveis para processamento.');
        }
      }
    } catch (error) {
      // Erro na hora de buscar solicitações
      console.error('Erro ao buscar solicitações:', error);
    }
  };

  // Função para atualizar o status de uma solicitação
  const atualizarSolicitacao = async (idPermissao, novoStatus) => {
    // Tentativa de fazer a chamada à API
    try {
      // Cria um objeto com os dados da atualização
      const dadosAtualizacao = {
        id_permissao: idPermissao,
        ds_status: novoStatus
      };
      // Imprime os dados da atualização
      console.log("atualiza:", dadosAtualizacao);
      // Faz uma chamada à API, passando os dados da atualização
      await api.patch('/permissao/', dadosAtualizacao);
      // Atualiza localmente as solicitações após a atualização bem-sucedida
      // Rebusca as solicitações após a atualização
      buscarSolicitacoes();
    } catch (error) {
      // Erro ao fazer a chamada à API
      console.error('Erro ao atualizar solicitação:', error);
    }
  };

  const buscarNomeProfessores = async () => {
    try {
      // Faz uma chamada à API, com o código padrão de professores como parâmetro
      const response = await api.get(`/user/cargo/707001`);
      // Obtém os dados da resposta da API
      const dadosProfessor = response.data;
      // Verifica se a resposta da API contém dados do usuário
      if (dadosProfessor.usuarios && dadosProfessor.usuarios.length > 0) {
        // Obtém o nome do professor
        const nomeProfessor = dadosProfessor.usuarios[0].nm_usuario;
        // Imprime o nome do professor
        console.log("nome:", nomeProfessor);
        // Retorna o nome do estudante
        return dadosProfessor.usuarios;
      } else {
        // Erro: a resposta da API não contém dados do usuário
        console.error('Resposta da API não contém dados de usuário:', dadosProfessor);
        // Retorna 'Nome não encontrado'
        return 'Nome não encontrado';
      }
    } catch (error) {
      // Erro ao fazer a chamada à API
      console.error('Erro ao buscar nome do Professor:', error);
      // Retorna 'Nome não encontrado'
      return 'Nome não encontrado';
    }
  }

  const optionComboBoxProf = async () => {
    try {
      // Chama a função para buscar os nomes dos professores na API
      const arrayProfessores = await buscarNomeProfessores();

      // Obtém a referência ao elemento select
      const selectProf = document.querySelector('select[name="select-prof"]');

      // Limpa as opções existentes no select
      selectProf.innerHTML = "";

      // Adiciona uma opção padrão
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Selecione um professor";
      selectProf.appendChild(defaultOption);

      // Adiciona as opções com os nomes dos professores
      arrayProfessores.forEach((professor) => {
        const option = document.createElement("option");
        option.value = professor.cd_matricula_usuario;
        option.text = professor.nm_usuario;
        selectProf.appendChild(option);
      });

      // Adiciona um ouvinte de evento para capturar a matrícula selecionada
      selectProf.addEventListener('change', function () {
        // Obtém a matrícula do professor selecionado
        const matriculaSelecionada = arrayProfessores.find(professor => professor.nm_usuario === this.value)?.cd_matricula;
        console.log(matriculaSelecionada);
      });

    } catch (error) {
      // Trate os erros, se necessário
      console.error('Erro ao preencher as opções do combo box:', error);
    }
  }

  const optionComboBoxLocal = async () => {
    try {
      // Chama a função para buscar todos os nomes de locais na API
      const response = await api.get('/chaves/');
      const arrayLocais = response.data;
      console.log(arrayLocais)
      console.log(typeof (arrayLocais))

      // Obtém a referência ao elemento select
      const selectLocal = document.querySelector('select[name="select-local"]');

      // Limpa as opções existentes no select
      selectLocal.innerHTML = "";

      // Adiciona uma opção padrão
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Selecione um local";
      selectLocal.appendChild(defaultOption);

      // Adiciona as opções com os nomes dos locais
      arrayLocais.forEach((local) => {
        const option = document.createElement("option");
        option.value = local.cd_chave;
        option.text = local.nm_chave;
        selectLocal.appendChild(option);
      });
    } catch (error) {
      // Trate os erros, se necessário
      console.error('Erro ao preencher as opções do combo box:', error);
    }
  }

  const payload = {
    cd_matricula_funcionario: prof,
    cd_matricula_estudante: prontuario,
    cd_chave: local
  };
  console.log('cpntecudo', payload);

  const gerarPedido = async () => {
    const response = await api.post('/permissao', payload);
    setMensagem('Pedido enviado ao professor com sucesso!');
    console.log(response.data);
  }

  // Função para lidar com o clique no botão de Aceitar
  const handleAceitar = async (idPermissao) => {
    await atualizarSolicitacao(idPermissao, 'SOLICITADO');
  };
  // Função para lidar com o clique no botão de Recusar
  const handleRecusar = async (idPermissao) => {
    await atualizarSolicitacao(idPermissao, 'RECUSADO');
  };

  // Efeito para buscar as solicitações ao montar o componente
  useEffect(() => {

    // Busca as solicitações
    buscarSolicitacoes();
    // Busca os nomes dos professores e adiciona no comboBox
    optionComboBoxProf();
    // Busca os nomes dos locais e adiciona no comboBox
    optionComboBoxLocal();
    // Imprime o valor da variável de estado `temSolicitacoesPendentes`
    console.log('tem?', temSolicitacoesPendentes);
  }, [temSolicitacoesPendentes]);


  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="formulario-prof">
          <div className="formulario-login container">
            <div className='container-botao'>
              <a className="local_botao" href="/main"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/main', { state: { user: userData } })
                }}>Voltar:</a>
            </div>
            <div className='formulario-login_form'>
              <h2 className="formulario_titulo">Seus pedidos, {userName}!</h2>
              <div className='formulario-pedidos'>
                <h2 className="formulario-login__h2">Faça seu pedido!</h2>
                <form className="formulario-approved container">
                  <div className='formulario-approved__input-container'>
                    <label for="select-prof" className='input-label'>Professor:</label>
                    <select name="select-prof" className="input inputs"
                      onChange={(e) => setProf(e.target.value)}>
                      <option value="professor">Professor X</option>
                    </select>
                  </div>
                  <div className='formulario-approved__input-container'>
                    <label for="select-local" className='input-label'>Local:</label>
                    <select name="select-local" className="input inputs"
                      onChange={(e) => setLocal(e.target.value)}>
                      <option value="sala">Sala X</option>
                    </select>
                  </div>
                  <button
                    className="boton-formulario-approved"
                    type="button"
                    onClick={gerarPedido}
                  >
                    Enviar Pedido
                  </button>
                  {/* Exibe mensagens relacionadas à alteração de senha, se houver */}
                  {mensagem && <p className='mensagem'>{mensagem}</p>}
                </form>
              </div>
            </div>
            <div className="formulario-login_form">
              {/* Seção de Pedidos Pendentes */}
              {/* Seção de Pedidos Pendentes */}
              <h2 className="formulario-login__h2">Pedidos Enviados:</h2>
              {solicitacoesPendentes.length === 0 && (
                <>
                  <p className='sem-pedido'>Não há pedidos Enviados!</p>
                </>
              )}
              {solicitacoesPendentes.length > 0 && (
                <>
                  {solicitacoesPendentes.map((solicitacao) => (
                    <form key={solicitacao.id} className="formulario-pedidos">
                      <div className="container-pedidos">
                        <label className="input-label" htmlFor={`solicitacao-${solicitacao.id}`}>
                          <div className="container-texto">
                            <p>Professor: {solicitacao.nomeprofessor}</p>
                            <p>Chave: {solicitacao.nomeChave} </p>
                            <p>Categoria da Chave: {solicitacao.categoriaChave}</p>
                          </div>
                        </label>
                        <div className="radio-buttons-container">
                        </div>
                      </div>
                    </form>
                  ))}
                </>
              )}

              {/* Seção de Pedidos Aceitos */}
              <h2 className="formulario-login__h2">Pedidos Aprovados:</h2>
              {solicitacoesAceitas.length === 0 && (
                <>
                  <p className='sem-pedido'>Não há pedidos Aceitos!</p>
                </>
              )}
              {solicitacoesAceitas.length > 0 && (
                <>
                  {solicitacoesAceitas.map((solicitacao) => (
                    <form key={solicitacao.id} className="formulario-pedidos">
                      <div className="container-pedidos">
                        <label className="input-label" htmlFor={`solicitacao-${solicitacao.id}`}>
                          <div className="container-texto">
                            <p>Professor: {solicitacao.nomeprofessor}</p>
                            <p>Chave: {solicitacao.nomeChave} </p>
                            <p>Categoria da Chave: {solicitacao.categoriaChave}</p>
                          </div>
                        </label>
                        <div className="radio-buttons-container">
                        </div>
                      </div>
                    </form>
                  ))}
                </>
              )}
              <h2 className="formulario-login__h2">Pedidos Recusados:</h2>
              {solicitacoesRecusadas.length === 0 && (
                <>
                  <p className='sem-pedido'>Não há pedidos Recusados!</p>
                </>
              )}
              {/* Seção de Pedidos Recusados */}
              {solicitacoesRecusadas.length > 0 && (
                <>
                  {solicitacoesRecusadas.map((solicitacao) => (
                    <form key={solicitacao.id} className="formulario-pedidos">
                      {/* Renderize as informações da solicitação aqui */}
                      <div className="container-pedidos">
                        <label className="input-label" htmlFor={`solicitacao-${solicitacao.id}`}>
                          <div className="container-texto">
                            <p>Professor: {solicitacao.nomeprofessor}</p>
                            <p>Chave: {solicitacao.nomeChave} </p>
                            <p>Categoria da Chave: {solicitacao.categoriaChave}</p>
                          </div>
                        </label>
                        <div className="radio-buttons-container">
                          <button
                            className="boton-form-aceitar"
                            type="button"
                            onClick={() => handleAceitar(solicitacao.id_permissao)}
                          >
                            Reenviar pedido
                          </button>
                        </div>
                      </div>
                    </form>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PedidosEstudante;