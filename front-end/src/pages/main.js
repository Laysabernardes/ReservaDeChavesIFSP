// Importações necessárias do React e de componentes externos
import React, { useEffect, useState } from 'react';
import '../css/main.css'; // Importa o estilo CSS para o componente main
import Header from './header';
import Banner from './banner.js';
import Footer from './footer.js';
import api from '../api'; // Importe a instância do Axios

import { useUser } from '../UserContext.js';

const coresHex = ['#81F459', '#85D139', '#68C13D', '#50C128', '#73DB4E', '#559A2A', '#24BC17', '19A516', '#11791B', '#0F7113', '#2A7B0D', '#0D9232'];

// Função para renderizar os cartões de locais
const renderizarLocais = (locais) => {
  return locais.map((local, index) => (
    // Para cada local, cria um cartão com informações
    <div key={local.cd_chave} className="local__card">
      <div
        className="local__card__imagem"
        // Estilo da imagem de fundo (comentado para ser ajustado)
        style={{ backgroundColor: coresHex[index % coresHex.length] }}
      ></div>
      <h3 className="local__card__titulo">{local.nm_chave}</h3>
      <p className="local__card__status">{local.ds_status}</p>
      <a className="local__card__botao" href="/reserva"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/reserva");
                }}>
        Reservar {local.ds_chave}
      </a>
    </div>
  ));
};

// Função para buscar locais de uma determinada categoria no backend
const buscaLocais = async (categoria) => {
  try {
    // Chama a API para obter locais da categoria especificada
    const response = await api.get(`/chaves/categoria/${categoria}`);
    console.log(`Resposta da API ${categoria}:`, response.data);

    // Extrai a lista de locais da resposta ou utiliza um array vazio
    const data = response.data.chave || [];

    // Filtra os locais com base na categoria
    const locais = data.filter(local => local.ds_chave === categoria);

    // Retorna a lista de locais
    return locais;
  } catch (error) {
    // Em caso de erro, registra no console e rejeita a promise para indicar o erro
    console.error(`Erro ao buscar locais da categoria ${categoria}:`, error);
    throw error;
  }
};

// Componente principal do main
const Main = () => {

  const { userData, setUserData, chavesData, setChavesData } = useUser();
  const nomeDoUsuario = userData ? userData.nm_solicitante : 'Nome Padrão';
  const cargoDoUsuario = userData ? userData.cd_cargo : 'Cargo Padrão';
  console.log('Nome do usuáriooo:', nomeDoUsuario);
  console.log('Cargooo', cargoDoUsuario); // Obtém as informações do usuário do contexto
  
  // Estados para armazenar locais de diferentes categorias
  const [locaisSalas, setLocaisSalas] = useState([]);
  const [locaisLabs, setLocaisLabs] = useState([]);
  const [locaisDiversos, setLocaisDiversos] = useState([]);

  // Efeito que é executado ao montar o componente
  useEffect(() => {
    // Função assíncrona para buscar os locais
    const fetchData = async () => {
      try {
        // Busca locais de cada categoria e atualiza os estados
        const salas = await buscaLocais('sala');
        const labs = await buscaLocais('laboratorio');
        const diversos = await buscaLocais('outro');

        // Atualiza os estados com os locais obtidos
        setLocaisSalas(salas);
        setLocaisLabs(labs);
        setLocaisDiversos(diversos);
      } catch (error) {
        // Em caso de erro, registra no console
        console.error('Erro ao buscar locais:', error);
      }
    };

    // Executa a função de busca ao montar o componente
    fetchData();
  }, []); // O segundo argumento vazio significa que o efeito ocorre apenas uma vez na montagem do componente

  // Renderização do componente principal
  return (
    <div>
      {/* Componentes de cabeçalho, banner e rodapé */}
      <Header />
      <Banner />
      {/* Seção de produtos */}
      <section className="section__produtos">
        <div className="produtos container">
          {/* Categoria de Salas */}
          <div className="salas">
            <div className="salas__head">
              <h2 className="salas__head__titulo-principal">Salas:</h2>
              {/* <a className="local_botao" href="/mostraChave"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/mostraChave");
                }}>Ver todos:</a> */}
            </div>
            <div className="barra-de-rolagem">
              <div className="produtos_index" id="data-salas">
              
                {/* Renderiza os locais de salas usando a função específica */}
                {renderizarLocais(locaisSalas)}
              </div>
            </div>
          </div>
          {/* Categoria de Laboratórios */}
          <div className="labs">
            <div className="labs__head">
              <h2 className="labs__head__titulo-principal">Laboratórios:</h2>
            </div>
            <div className="produtos_index" id="data-labs">
              {/* Renderiza os locais de laboratórios usando a função específica */}
              {renderizarLocais(locaisLabs)}
            </div>
          </div>
          {/* Categoria de Diversos */}
          <div className="diversos">
            <div className="diversos__head">
              <h2 className="diversos__head__titulo-principal">Diversos:</h2>
            </div>
            <div className="produtos_index" data-diversos>
              {/* Renderiza os locais diversos usando a função específica */}
              {renderizarLocais(locaisDiversos)}
            </div>
          </div>
        </div>
      </section>
      {/* Componente de rodapé */}
      <Footer />
    </div>
  );
};

// Exporta o componente principal para uso em outros lugares
export default Main;
