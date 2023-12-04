import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext.js';
import Header from './header';
import Footer from './footer';
import api from '../api';
import '../css/reset.css';
import '../css/index.css';
import '../css/PedidosProf.css';

function PedidosProf() {
  const { userData } = useUser();
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);
  const [solicitacoesAceitas, setSolicitacoesAceitas] = useState([]);
  const [solicitacoesRecusadas, setSolicitacoesRecusadas] = useState([]);

  const prontuario = userData ? userData.cd_matricula_usuario : 'N/A';
  const userName = userData ? userData.nm_usuario : 'Usuário';

  // Função para buscar o nome do estudante com base na matrícula
  const buscarNomeEstudante = async (matricula) => {
    try {
      const response = await api.get(`/user/nome/${matricula}`);
      const dadosEstudante = response.data;

      if (dadosEstudante.usuarios && dadosEstudante.usuarios.length > 0) {
        console.log("nome:", dadosEstudante.usuarios[0].nm_usuario);
        return dadosEstudante.usuarios[0].nm_usuario; // Substitua 'nome' pelo campo real que contém o nome do estudante
      } else {
        console.error('Resposta da API não contém dados de usuário:', dadosEstudante);
        return 'Nome não encontrado';
      }
    } catch (error) {
      console.error('Erro ao buscar nome do estudante:', error);
      return 'Nome não encontrado';
    }
  };

  const buscarInformacoesChave = async (cd_chave) => {
    try {
      const response = await api.get(`/chaves/${cd_chave}`);
      const dadosChave = response.data;

      if (dadosChave.chave && dadosChave.chave.length > 0) {
        console.log("Chave:", dadosChave.chave[0].nm_chave);
        console.log("Categoria:", dadosChave.chave[0].ds_chave);
        return dadosChave.chave[0];
      } else {
        console.error('Resposta da API não contém dados da chave:', dadosChave);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar informações da chave:', error);
      return null;
    }
  };


  // Função para buscar as solicitações no banco de dados
  const buscarSolicitacoes = async () => {
    try {
      const response = await api.get(`/permissao/funcionario/${prontuario}`);
      const dadosDaAPI = response.data;

      if (dadosDaAPI.pedidos && Array.isArray(dadosDaAPI.pedidos)) {
        const pendentes = [];
        const aceitas = [];
        const recusadas = [];

        for (const solicitacao of dadosDaAPI.pedidos) {
          const nomeEstudante = await buscarNomeEstudante(solicitacao.cd_matricula_estudante);
          solicitacao.nomeEstudante = nomeEstudante;

          const informacoesChave = await buscarInformacoesChave(solicitacao.cd_chave);
          if (informacoesChave) {
            solicitacao.nomeChave = informacoesChave.nm_chave;
            solicitacao.categoriaChave = informacoesChave.ds_chave;
          } else {
            solicitacao.nomeChave = 'Chave não encontrada';
            solicitacao.categoriaChave = 'Categoria não encontrada';
          }

          const idPermissao = solicitacao.id_permissao;
          console.log('ID da Permissão:', idPermissao);

          if (solicitacao.ds_status === 'SOLICITADO') {
            pendentes.push(solicitacao);
          } else if (solicitacao.ds_status === 'ACEITO') {
            aceitas.push(solicitacao);
          } else if (solicitacao.ds_status === 'RECUSADO') {
            recusadas.push(solicitacao);
          }
        }

        setSolicitacoesPendentes(pendentes);
        setSolicitacoesAceitas(aceitas);
        setSolicitacoesRecusadas(recusadas);

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
        console.error('Os dados da API não contêm um array de pedidos:', dadosDaAPI);
        // Trate aqui o caso em que os dados não são como esperado
      }
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
  };


  const atualizarSolicitacao = async (idPermissao, novoStatus) => {
    try {
      const dadosAtualizacao = {
        id_permissao: idPermissao,
        ds_status: novoStatus
      };
      console.log("atualiza:", dadosAtualizacao);

      // Substitua '/permissao/' pelo endpoint correto da sua API
      await api.patch('/permissao/', dadosAtualizacao);

      // Atualiza localmente após a atualização bem-sucedida
      buscarSolicitacoes(); // Rebuscar as solicitações após a atualização
    } catch (error) {
      console.error('Erro ao atualizar solicitação:', error);
    }
  };


  // Função para lidar com o clique no botão de Aceitar
  const handleAceitar = async (idPermissao) => {
    await atualizarSolicitacao(idPermissao, 'ACEITO');
  };

  // Função para lidar com o clique no botão de Recusar
  const handleRecusar = async (idPermissao) => {
    await atualizarSolicitacao(idPermissao, 'RECUSADO');
  };


  // Efeito para buscar as solicitações ao montar o componente
  useEffect(() => {
    buscarSolicitacoes();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="formulario">
          <div className="formulario-login container">
            <h2 className="formulario-login__titulo">Pedidos para {userName}!</h2>
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
                  {solicitacoesPendentes.map((solicitacao) => (
                    <form key={solicitacao.id} className="formulario-pedidos">
                      <div className="container-pedidos">
                        <label className="input-label" htmlFor={`solicitacao-${solicitacao.id}`}>
                          <div className="container-texto">
                            <p>Nome: {solicitacao.nomeEstudante}</p>
                            <p>Matrícula: {solicitacao.cd_matricula_estudante}</p>
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
                            Aceitar
                          </button>
                          <button
                            className="boton-form-recusar"
                            type="button"
                            onClick={() => handleRecusar(solicitacao.id_permissao)}
                          >
                            Recusar
                          </button>
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
                  {solicitacoesAceitas.map((solicitacao) => (
                    <form key={solicitacao.id} className="formulario-pedidos">
                      <div className="container-pedidos">
                        <label className="input-label" htmlFor={`solicitacao-${solicitacao.id}`}>
                          <div className="container-texto">
                            <p>Nome: {solicitacao.nomeEstudante}</p>
                            <p>Matrícula: {solicitacao.cd_matricula_estudante}</p>
                            <p>Chave: {solicitacao.nomeChave} </p>
                            <p>Categoria da Chave: {solicitacao.categoriaChave}</p>
                          </div>
                        </label>
                        <div className="radio-buttons-container">
                          <button
                            className="boton-form-recusar"
                            type="button"
                            onClick={() => handleRecusar(solicitacao.id_permissao)}
                          >
                            Remover permissão
                          </button>
                        </div>
                      </div>
                    </form>
                  ))}
                </>
              )}
              <h2 className="formulario-login__h2">Pedidos Recusados:</h2>
              {solicitacoesRecusadas.length  === 0 && (
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
                            <p>Nome: {solicitacao.nomeEstudante}</p>
                            <p>Matrícula: {solicitacao.cd_matricula_estudante}</p>
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
                            Reconsiderar pedido
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

export default PedidosProf;