// MostraChave.js
import React, { useState, useEffect } from 'react';
import '../css/main.css'; // Importe o estilo CSS para o componente mostraChave
import Header from './header';
import Footer from './footer';
import api from '../api'; // Importe a instância do Axios

const MostraChave = () => {
  const [todasChaves, setTodasChaves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          // Chama a API para obter todas as chaves
          const response = await api.get('/chaves');
          console.log('Resposta da API - Todas as chaves:', response);
      
          if (response.status === 200) {
            // Extrai a lista de chaves da resposta ou utiliza um array vazio
            const data = response.data || [];
            console.log('Dados das chaves:', data);
      
            // Atualiza o estado com todas as chaves obtidas
            setTodasChaves(data);
          } else {
            console.error('Erro na resposta da API:', response.status);
          }
        } catch (error) {
          // Em caso de erro, registra no console
          console.error('Erro ao buscar todas as chaves:', error);
        }
      };
      
    // Executa a função de busca ao montar o componente
    fetchData();
  }, []);

  // Função para renderizar os cartões de chaves
  const renderizarChaves = () => {
    return todasChaves.map((chave) => (
      // Para cada chave, cria um cartão com informações
      <div key={chave.cd_chave} className="local__card">
        <h3 className="local__card__titulo">{chave.nm_chave}</h3>
        <p className="local__card__status">{chave.ds_status}</p>
        <a className="local__card__botao" href={`/reservar/${chave.cd_chave}`}>
          Reservar
        </a>
      </div>
    ));
  };

  return (
    <div>
      {/* Componentes de cabeçalho e rodapé */}
      <Header />
      {/* Seção de chaves */}
      <section className="section__produtos">
        <div className="produtos container">
          <div className="salas__head">
            <h2 className="salas__head__titulo-principal">Todas as Chaves:</h2>
          </div>
          <div className="produtos_index" id="data-chaves">
            {/* Renderiza todas as chaves usando a função específica */}
            {renderizarChaves()}
          </div>
        </div>
      </section>
      {/* Componente de rodapé */}
      <Footer />
    </div>
  );
};

export default MostraChave;
