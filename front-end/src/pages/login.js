import React from 'react';
import '../css/reset.css';
import '../css/index.css';
import '../css/login.css';
import Header from './header.js'
import Footer from './footer.js';


function LoginForm() {
  return (
    <div>
      <Header />
      <div className="formulario">
        <div className="formulario-login container">
          <h3 className="formulario-login__titulo">Iniciar Sessão</h3>
          <form action="" className="formulario-login_form">
            <div className="formulario-login__input-container">
              <input
                name="prontuario"
                id="prontuario"
                className="input inputs"
                type="text"
                placeholder=""
                required
              />
              <label className="input-label" htmlFor="prontuario">
                Escreva seu prontuario
              </label>
              <span className="input-message-error">Este campo não é valido</span>
            </div>
            <div className="formulario-login__input-container">
              <input
                name="senha"
                id="senha"
                className="input inputs"
                type="password"
                placeholder=""
                required
              />
              <label className="input-label" htmlFor="senha">
                Escreva sua senha
              </label>
              <span className="input-message-error">Este campo não é valido</span>
            </div>
            <input
              className="boton-formulario-login"
              type="submit"
              name="enviar"
              id="enviar-login"
              value="Entrar"
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

export default LoginForm;
