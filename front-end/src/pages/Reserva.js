import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../api'; // Importe a instância do Axios

import Header from './header.js';
import Footer from './footer.js';

import '../css/reset.css';
import '../css/index.css';
import '../css/login.css';
import '../css/Reserva.css';

function ReservaForm() {

  const navigate = useNavigate();
  // Restante do componente
  return (
    
    <div>
      <Header />
      <section className="sessao__chave">
        <div className="chave container" data-chave="">
          <img className="chave__imagem" src=""></img>
          <div className="chave__info">
            <h2 className="chave__info__titulo"></h2>
            <p className="chave__info__descricao">
              <div className="formulario">
                <div className="formulario-login container">
                  <h3 className="formulario-login__titulo">Nome da sala</h3>
                  <form action="" className="formulario-login_form">
                    <div className="formulario-login__input-container">
                      <input
                        readOnly
                        name="situacao"
                        id="situacao"
                        className="input inputs"
                        type="text"
                        placeholder=""
                        required
                        data-tipo="situacao"
                        // Colocar a situacao no value
                        value=""
                        data-form-usuario
                      />
                      <label className="input-label" htmlFor="situacao">
                        Situação:
                      </label>
                      <span className="input-message-error">
                        Este campo não é valido
                      </span>
                    </div>
                    <div id="previsao" className="formulario-login__input-container">
                      <input
                        name="data"
                        id="data"
                        className="input inputs input-contraseña"
                        type="datetime-local"
                        placeholder="date"
                        required
                        data-tipo="date"
                        data-form-contraseña
                      />
                      <label className="input-label" htmlFor="data">
                        Data e Horário:
                      </label>
                      <span className="input-message-error">
                        Este campo não é valido
                      </span>
                    </div>
                    <input
                      className="boton-formulario-login"
                      type="submit"
                      name="enviar"
                      id="reservar-sala"
                      value="Reservar Sala"
                    />
                  </form>
                </div>
              </div>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ReservaForm;
