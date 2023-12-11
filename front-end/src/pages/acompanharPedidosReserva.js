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
import '../css/PedidosAdm.css';

// Componente funcional PedidosProf
function AcompanharPedidos() {

    // Estados para armazenar informações de pedidos e outros estados necessários
    const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);
    const [solicitacoesAceitas, setSolicitacoesAceitas] = useState([]);
    const [solicitacoesRecusadas, setSolicitacoesRecusadas] = useState([]);
    const [temSolicitacoesPendentes, setTemSolicitacoesPendentes] = useState([]);
    const [precisaPermissao, setPrecisaPermissao] = useState([]);

    // Obtém a função navigate do React Router para redirecionamento
    const navigate = useNavigate();
    const location = useLocation();

    // Obtém dados do usuário do armazenamento local (localStorage)
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Função para buscar o nome do estudante com base na matrícula
    //Argumentos:matricula: Matrícula do estudante a ser buscado
    // Retorno: O nome do estudante, ou Nome não encontrado se o estudante não for encontrado
    // Função para buscar o nome do estudante com base na matrícula
    const buscarNomeSolicitante = async (matricula) => {
        // Tentativa de fazer a chamada à API
        try {
            // Faz uma chamada à API, passando a matrícula como parâmetro
            const response = await api.get(`/user/nome/${matricula}`);
            // Obtém os dados da resposta da API
            const dadosSolicitante = response.data;
            // Verifica se a resposta da API contém dados do usuário
            if (dadosSolicitante.usuario && dadosSolicitante.usuario.length > 0) {
                // Obtém o nome do estudante
                const nomeSolicitante = dadosSolicitante.usuario[0].nm_usuario;
                // Imprime o nome do estudante
                console.log("nome:", nomeSolicitante);
                // Retorna o nome do estudante
                return nomeSolicitante;
            } else {
                // Erro: a resposta da API não contém dados do usuário
                console.error('Resposta da API não contém dados de usuário:', dadosSolicitante);
                // Retorna 'Nome não encontrado'
                return 'Nome não encontrado';
            }
        } catch (error) {
            // Erro ao fazer a chamada à API
            console.error('Erro ao buscar nome do estudante:', error);
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

    const buscarCargo = async (cd_cargo) => {
        // Tentativa de fazer a chamada à API
        try {
            // Faz uma chamada à API, passando o código da chave como parâmetro
            const response = await api.get(`/user/tbcargo/${cd_cargo}`);
            // Obtém os dados da resposta da API
            const dadosCargo = response.data;

            // Verifica se a resposta da API contém dados da chave
            if (dadosCargo.cargo && dadosCargo.cargo.length > 0) {
                // Imprime o nome e a categoria da chave
                console.log("Cargo:", dadosCargo.cargo[0].ds_cargo);
                console.log("Categoria do Cargo:", dadosCargo.cargo[0].ds_categoria_cargo);
                // Retorna o objeto com as informações da chave
                return dadosCargo.cargo[0];
            } else {
                // Erro: a resposta da API não contém dados da chave
                console.error('Resposta da API não contém dados da chave:', dadosCargo);
                // Retorna `null`
                return null;
            }
        } catch (error) {
            // Erro ao fazer a chamada à API
            console.error('Erro ao buscar informações da chave:', error);
            return null;
        }
    };

    const buscarPermissao = async (id_permissao_estudante) => {
        try {
            // Faz uma chamada à API, passando o código da chave como parâmetro
            const response = await api.get(`/permissao/id/${id_permissao_estudante}`);
            // Obtém os dados da resposta da API
            const dadospermissao = response.data;

            // Verifica se a resposta da API contém dados da chave
            if (dadospermissao.pedidos && dadospermissao.pedidos.length > 0) {
                // Imprime o nome e a categoria da chave
                const matriculaProf = dadospermissao.pedidos[0].cd_matricula_funcionario;
                console.log("Matriculo Professor:", matriculaProf);
                const nomeProf = await buscarNomeSolicitante(matriculaProf);
                return nomeProf;
            } else {            // Erro: a resposta da API não contém dados da chave
                console.error('Resposta da API não contém dados da professor:', dadospermissao);
                // Retorna `null`
                return null;
            }
        } catch (error) {
            // Erro ao fazer a chamada à API
            console.error('Erro ao buscar informações do professor:', error);
            return null;
        }
    }

    const FormatarData = async (dt_reserva) => {
        const data = new Date(dt_reserva);
        // Formatar a data como dd/mm/aaaa
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }

    // Função para buscar as solicitações no banco de dados
    const buscarsolicitacoes = async () => {
        // Tentativa de fazer a chamada à API
        try {
            // Faz uma chamada à API, passando o prontuário do funcionário como parâmetro
            const response = await api.get(`/reserva/solicitante/${userData.cd_matricula_usuario}`);
            console.log(response.data.solicitacoes);
            // Obtém os dados da resposta da API
            const dadosDaAPI = response.data.solicitacoes;
            // Verifica se a resposta da API contém um array de solicitações
            if (dadosDaAPI && Array.isArray(dadosDaAPI)) {

                // Cria três arrays para armazenar as solicitações pendentes, aceitas e recusadas
                const pendentes = [];
                const aceitas = [];
                const recusadas = [];

                // Itera sobre as solicitações da resposta da API
                for (const solicitacoes of dadosDaAPI) {
                    // Chama a função `buscarNomeEstudante()` para obter o nome do solicitante
                    const nomeSolicitante = await buscarNomeSolicitante(solicitacoes.cd_matricula_solicitante);
                    // Atualiza o objeto  com o nome do solicitante
                    solicitacoes.nomeSolicitante = nomeSolicitante;
                    // Chama a função `buscarInformacoesChave()` para obter as informações da chave
                    const informacoesChave = await buscarInformacoesChave(solicitacoes.cd_chave);
                    // Se as informações da chave forem encontradas, atualiza o objeto ` com as informações da chave
                    if (informacoesChave) {
                        solicitacoes.nomeChave = informacoesChave.nm_chave;
                        solicitacoes.categoriaChave = informacoesChave.ds_chave;
                    } else {
                        // Se as informações da chave não forem encontradas, atualiza o objeto `` com valores padrão
                        solicitacoes.nomeChave = 'Chave não encontrada';
                        solicitacoes.categoriaChave = 'Categoria não encontrada';
                    }

                    const cargo = await buscarCargo(solicitacoes.cd_cargo);
                    // Atualiza o objeto  com o nome do solicitante
                    solicitacoes.cargo = cargo;
                    if (solicitacoes.cd_cargo === 'A0001') {
                        const ProfPermissao = await buscarPermissao(solicitacoes.id_permissao_estudante);
                        solicitacoes.nomeprof = ProfPermissao;
                        setPrecisaPermissao(true);
                    } else {
                        setPrecisaPermissao(false);
                    }

                    const datasolicitacoes = await FormatarData(solicitacoes.dt_reserva);
                    solicitacoes.data = datasolicitacoes;

                    const horarioreserva = solicitacoes.hr_reserva;
                    const JSONhorario = JSON.parse(horarioreserva);
                    const inicial = JSONhorario[0];
                    const final = JSONhorario[JSONhorario.length - 1];
                    const formatohora = (`${inicial} até ${final}`);
                    solicitacoes.hr_reserva = formatohora;
                    console.log(formatohora);

                    // Obtém o ID da permissão
                    const idsolicitacoes = solicitacoes.id_reserva;
                    // Imprime o ID da permissão
                    console.log('ID da Permissão:', idsolicitacoes);
                    // Classifica a solicitação de acordo com seu status
                    if (solicitacoes.ds_status === 'SOLICITANDO') {
                        pendentes.push(solicitacoes);
                    } else if (solicitacoes.ds_status === 'ACEITO') {
                        aceitas.push(solicitacoes);
                    } else if (solicitacoes.ds_status === 'RECUSADO') {
                        recusadas.push(solicitacoes);
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
    const atualizarSolicitacao = async (idsolicitacoes, novoStatus) => {
        // Tentativa de fazer a chamada à API
        try {
            // Cria um objeto com os dados da atualização
            const dadosAtualizacao = {
                id_reserva: idsolicitacoes,
                ds_status: novoStatus
            };
            // Imprime os dados da atualização
            console.log("atualiza:", dadosAtualizacao);
            // Faz uma chamada à API, passando os dados da atualização
            await api.patch('/reserva/', dadosAtualizacao);
            // Atualiza localmente as solicitações após a atualização bem-sucedida
            // Rebusca as solicitações após a atualização
            buscarsolicitacoes();
        } catch (error) {
            // Erro ao fazer a chamada à API
            console.error('Erro ao atualizar solicitação:', error);
        }
    };

    // Função para lidar com o clique no botão de Aceitar
    const handleAceitar = async (idsolicitacoes) => {
        await atualizarSolicitacao(idsolicitacoes, 'ACEITO');
    };
    // Função para lidar com o clique no botão de Recusar
    const handleRecusar = async (idsolicitacoes) => {
        await atualizarSolicitacao(idsolicitacoes, 'RECUSADO');
    };

    // Efeito para buscar as solicitações ao montar o componente
    useEffect(() => {

        // Busca as solicitações
        buscarsolicitacoes();
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
                        <h2 className="formulario_titulo">Pedidos de solicitacoes:</h2>
                        <div className="formulario-login_form">
                            {/* Seção de Pedidos Pendentes */}
                            {/* Seção de Pedidos Pendentes */}
                            <h2 className="formulario-login__h2">Pedidos Pendentes:</h2>
                            {solicitacoesPendentes.length === 0 && (
                                <>
                                    <p className='sem-pedido'>Não há pedidos Pendentes!</p>
                                </>
                            )}

                            {solicitacoesPendentes.length > 0 && (
                                <>
                                    {solicitacoesPendentes.map((solicitacoes) => (
                                        <form key={solicitacoes.id} className="formulario-pedidos2">
                                            <div className="container-pedidos">
                                                <h2 className='identificador'>#{solicitacoes.id_reserva}</h2>

                                                <label className="input-label" htmlFor={`solicitacoes-${solicitacoes.id}`}>
                                                    <div className="container-texto-aluno">
                                                        <p><span style={{ fontWeight: 'bold' }}>Nome:</span> {solicitacoes.nomeSolicitante}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Matrícula:</span> {solicitacoes.cd_matricula_solicitante}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Categoria:</span> {solicitacoes.cargo.ds_cargo}</p>
                                                        {precisaPermissao === true && (
                                                            <>
                                                                <p><span style={{ fontWeight: 'bold' }}>Liberado por:</span> {solicitacoes.nomeprof}</p>
                                                            </>
                                                        )}
                                                        <p><span style={{ fontWeight: 'bold' }}>Chave solicitada:</span> {solicitacoes.nomeChave}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Data da solicitação:</span> {solicitacoes.data}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Horario da solicitação:</span> {solicitacoes.hr_reserva}</p>
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
                            <h2 className="formulario-login__h2">Pedidos Aceitos:</h2>
                            {solicitacoesAceitas.length === 0 && (
                                <>
                                    <p className='sem-pedido'>Não há pedidos Aceitos!</p>
                                </>
                            )}
                            {solicitacoesAceitas.length > 0 && (
                                <>
                                    {solicitacoesAceitas.map((solicitacoes) => (
                                        <form key={solicitacoes.id} className="formulario-pedidos2">
                                            <div className="container-pedidos">
                                                <h2 className='identificador'>#{solicitacoes.id_reserva}</h2>

                                                <label className="input-label" htmlFor={`solicitacoes-${solicitacoes.id}`}>
                                                <div className="container-texto-aluno">
                                                        <p><span style={{ fontWeight: 'bold' }}>Nome:</span> {solicitacoes.nomeSolicitante}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Matrícula:</span> {solicitacoes.cd_matricula_solicitante}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Categoria:</span> {solicitacoes.cargo.ds_cargo}</p>
                                                        {precisaPermissao === true && (
                                                            <>
                                                                <p><span style={{ fontWeight: 'bold' }}>Liberado por:</span> {solicitacoes.nomeprof}</p>
                                                            </>
                                                        )}
                                                        <p><span style={{ fontWeight: 'bold' }}>Chave solicitada:</span> {solicitacoes.nomeChave}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Data da solicitação:</span> {solicitacoes.data}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Horario da solicitação:</span> {solicitacoes.hr_reserva}</p>
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
                                    {solicitacoesRecusadas.map((solicitacoes) => (
                                        <form key={solicitacoes.id} className="formulario-pedidos2">
                                            {/* Renderize as informações da solicitação aqui */}
                                            <div className="container-pedidos">
                                                <h2 className='identificador'>#{solicitacoes.id_reserva}</h2>
                                                <label className="input-label" htmlFor={`solicitacoes-${solicitacoes.id}`}>
                                                <div className="container-texto-aluno">
                                                        <p><span style={{ fontWeight: 'bold' }}>Nome:</span> {solicitacoes.nomeSolicitante}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Matrícula:</span> {solicitacoes.cd_matricula_solicitante}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Categoria:</span> {solicitacoes.cargo.ds_cargo}</p>
                                                        {precisaPermissao === true && (
                                                            <>
                                                                <p><span style={{ fontWeight: 'bold' }}>Liberado por:</span> {solicitacoes.nomeprof}</p>
                                                            </>
                                                        )}
                                                        <p><span style={{ fontWeight: 'bold' }}>Chave solicitada:</span> {solicitacoes.nomeChave}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Data da solicitação:</span> {solicitacoes.data}</p>
                                                        <p><span style={{ fontWeight: 'bold' }}>Horario da solicitação:</span> {solicitacoes.hr_reserva}</p>
                                                    </div>
                                                </label>
                                                <div className="radio-buttons-container">

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

export default AcompanharPedidos;