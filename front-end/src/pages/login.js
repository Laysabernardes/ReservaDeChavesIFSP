import React from 'react';
import '../css/reset.css';
import '../css/index.css';
import '../css/login.css';
import Header from './header.js'
import Footer from './footer.js';


function LoginForm() {
  return (
    <div>
    <Header/>
    <div className="formulario">
      <div className="formulario-login container">
        <h3 className="formulario-login__titulo">Iniciar Sessão</h3>
        <form action="" className="formulario-login_form">
          <div className="formulario-login__input-container">
            <input
              name="usuario"
              id="usuario"
              className="input inputs"
              type="text"
              placeholder=""
              required
              data-tipo="usuario"
              data-form-usuario
            />
            <label className="input-label" htmlFor="usuario">
              Escreva seu e-mail
            </label>
            <span className="input-message-error">Este campo não é valido</span>
          </div>
          <div className="formulario-login__input-container">
            <input
              name="contraseña"
              id="contraseña"
              className="input inputs input-contraseña"
              type="password"
              placeholder=""
              required
              data-tipo="contraseña"
              data-form-contraseña
            />
            <label className="input-label" htmlFor="contraseña">
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
          />
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default LoginForm;
