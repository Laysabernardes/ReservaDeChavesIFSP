import React, { useEffect, useState } from 'react';
import '../css/main.css'; // Importa o estilo CSS para o componente main
import Header from './header';
import Banner from './banner.js';
import Footer from './footer.js';

function Main() {
  const [locaisSalas, setLocaisSalas] = useState([]);
  const [locaisLabs, setLocaisLabs] = useState([]);
  const [locaisDiversos, setLocaisDiversos] = useState([]);

//   useEffect(() => {
//     // Simula a chamada de uma função assíncrona para buscar os locais
//     const fetchData = async () => {
//       try {
//         const data = await locaisServices.findAllLocal();

//         // Organiza os locais com base na categoria
//         const salas = data.filter(local => local.categoria === 'Sala');
//         const labs = data.filter(local => local.categoria === 'Laboratório');
//         const diversos = data.filter(local => local.categoria === 'Diverso');

//         // Atualiza os estados
//         setLocaisSalas(salas);
//         setLocaisLabs(labs);
//         setLocaisDiversos(diversos);
//       } catch (error) {
//         console.error('Erro ao buscar locais:', error);
//       }
//     };

//     fetchData();
//   }, []); // O segundo argumento vazio significa que o efeito ocorre apenas uma vez na montagem do componente

  return (
    <div>
      <Header />
      <Banner />
      <section className="section__produtos">
        <div className="produtos container">
          <div className="salas">
            <div className="salas__head">
              <h2 className="salas__head__titulo-principal">Salas:</h2>
            </div>
            <div className="produtos_index" id="data-salas">
              {locaisSalas.map(local => (
                <div key={local.id}>{local.nm_chave}</div>
              ))}
            </div>
          </div>
          <div className="labs">
            <div className="labs__head">
              <h2 className="labs__head__titulo-principal">Laboratórios:</h2>
            </div>
            <div className="produtos_index" id="data-labs">
              {locaisLabs.map(local => (
                <div key={local.id}>{local.nm_chave}</div>
              ))}
            </div>
          </div>
          <div className="diversos">
            <div className="diversos__head">
              <h2 className="diversos__head__titulo-principal">Diversos:</h2>
            </div>
            <div className="produtos_index" data-diversos>
              {locaisDiversos.map(local => (
                <div key={local.id}>{local.nm_chave}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Main;
