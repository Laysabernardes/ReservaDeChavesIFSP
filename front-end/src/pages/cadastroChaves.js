import React from 'react';
import Header from './header.js';
import Footer from './footer.js';
import '../css/cadastroChave.css';


function Cadastro() {
  return (
    <div>
      <Header />
      <div className="formulario_cadastro_area">
        <div className="formulario-cadastro container">
          <h3 className="formulario-cadastro__titulo">Cadastrar Chave:</h3>
          <form action="" className="formulario-cadastro_form">
            <div className="formulario-cadastro__input-container">
              <input               
                name="nome_reserva"
                id="reservaName"
                className="input inputs"
                type="number"
                placeholder=""
                required
              />
              <label className="input-label" htmlFor="reservaName">
                Número da chave:
              </label>
            </div>
            
            <div className="formulario-cadastro__input-container">
              
              <label className="input-label" htmlFor="categoriaLocal">
                Tipo de sala:
              </label>
              <div className="radio-buttons-container">
              <input
                type="radio"
                id="sala"
                name="categoria"
                value="Sala"
                required
              />
              <label htmlFor="sala">Sala</label>

              <input
                type="radio"
                id="laboratorio"
                name="categoria"
                value="Laboratório"
                required
              />
              <label htmlFor="laboratorio">Laboratório</label>

              <input
                type="radio"
                id="outro"
                name="categoria"
                value="Outro"
                required
              />
              <label htmlFor="outro">Outro</label>
              </div>
            </div>
            <div className="formulario-cadastro__input-container">
              <input               
                name="cadastroFor"
                id="aprovadoPor"
                className="input inputs"
                type="text"
                placeholder=""               
              />
              
              <label className="input-label" htmlFor="aprovadorPor">
                Observações adicionais:
              </label>
            </div>
            
            <input
              className="boton-formulario-cadastro"
              type="submit"
              name="aprovar"
              id="enviar-aprovado"
              value="Cadastrar"
              onClick={(e) => {
                // Redireciona o usuário para a página principal
                window.location.replace("/main");
              }}
            />
            
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cadastro;

