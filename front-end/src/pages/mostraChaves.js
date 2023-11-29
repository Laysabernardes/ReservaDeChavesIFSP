// MostraChave.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../css/main.css'; // Importe o estilo CSS para o componente mostraChave
import Header from './header';
import Footer from './footer';
import api from '../api'; // Importe a instância do Axios
import { renderizarLocais } from '../renderizar.js';

const MostraChave = () => {

  const navigate = useNavigate();
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

  return (
    <div>
      {/* Componentes de cabeçalho e rodapé */}
      <Header />
      {/* Seção de chaves */}
      <section className="section__produtos">
        <div className="produtos container">
          <div className="salas__head">
            <h2 className="salas__head__titulo-principal">Todas as Chaves:</h2>
            <a className="local_botao" href="/mostraChave"
                onClick={(e) => {
                e.preventDefault();
                navigate('/main');
              }}>Voltar:</a>
          </div>
          <div className="produtos_index" id="data-chaves">
            {/* Renderiza todas as chaves usando a função específica */}
            {renderizarLocais(todasChaves, navigate)}
          </div>
        </div>
      </section>
      {/* Componente de rodapé */}
      <Footer />
    </div>
  );
};

export default MostraChave;
