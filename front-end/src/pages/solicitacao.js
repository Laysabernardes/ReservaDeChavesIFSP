import React from 'react';
import Header from './header.js';
import Footer from './footer.js';
import '../css/reset.css';
import '../css/index.css';
// Adicione o arquivo de estilo para a página de sucesso

function PaginaDeSolicitacao({ chave }) {
  return (
    <div>
      <Header />
      <section className="sucesso-container">
        <h2>Reserva Bem-Sucedida</h2>
        <p>Sua reserva foi realizada com sucesso. Detalhes da reserva:</p>
        <table className="tabela-sucesso">
          <thead>
            <tr>
              <th>Chave</th>
              <th>Status</th>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{chave ? chave.ds_chave : 'N/A'}</td>
              <td>{chave ? chave.ds_status : 'N/A'}</td>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  );
}

export default PaginaDeSolicitacao;
