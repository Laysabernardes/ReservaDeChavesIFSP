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
    const [ChangeMessage, setChangeMessage] = useState('');
  
    const [solicitacoes, setSolicitacoes] = useState([]);

    const prontuario = userData ? userData.cd_matricula_solicitante : 'N/A';
  
    // Função para buscar as solicitações no banco de dados
    const buscarSolicitacoes = async () => {
      try {
        const response = await api.get(`/permissao/funcionario/${prontuario}`);
        const solicitacoesDoBanco = response.data; // Substitua com o formato real dos dados
  
        // Filtrar solicitações com status "em andamento"
        const solicitacoesFiltradas = solicitacoesDoBanco.filter(solicitacao => solicitacao.ds_status === 'solicitacao');
  
        setSolicitacoes(solicitacoesFiltradas);
      } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
      }
    };
  
    // Função para atualizar a solicitação no banco de dados
    const atualizarSolicitacao = async (status) => {
      try {
        // Substitua os parâmetros com as informações necessárias para a atualização
        await api.put('/api/atualizarSolicitacao', { status });
        // Atualiza localmente após a atualização bem-sucedida
        buscarSolicitacoes(); // Rebuscar as solicitações após a atualização
      } catch (error) {
        console.error('Erro ao atualizar solicitação:', error);
      }
    };
  
    // Função para lidar com o clique no botão de Aceitar
    const handleAceitar = async () => {
      await atualizarSolicitacao('aceito');
    };
  
    // Função para lidar com o clique no botão de Recusar
    const handleRecusar = async () => {
      await atualizarSolicitacao('recusado');
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
                <h3 className="formulario-login__titulo">Pedidos</h3>
                <div className="formulario-login_form">
                  {solicitacoes.length === 0 ? (
                    <h2 className="formulario-login__h2">Não há notificações</h2>
                  ) : (
                    solicitacoes.map(solicitacao => (
                      <form key={solicitacao.id} className="formulario-cadastro__input-container">
                        <div className="formulario-cadastro__input-container">
                          <div className="formulario-cadastro__input-container input">
                            <label className="input-label" htmlFor={`solicitacao-${solicitacao.id}`}>
                              Nome: {solicitacao.nm_estudante} - Matrícula: {solicitacao.cd_matricula_estudante}
                            </label>
                            <div className="radio-buttons-container">
                              <button
                                className="boton-form-aceitar"
                                type="button"
                                onClick={() => handleAceitar(solicitacao.id)}
                              >
                                Aceitar
                              </button>
                              <button
                                className="boton-form-recusar"
                                type="button"
                                onClick={() => handleRecusar(solicitacao.id)}
                              >
                                Recusar
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ))
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
