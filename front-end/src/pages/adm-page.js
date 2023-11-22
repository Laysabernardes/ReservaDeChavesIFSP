// Importa o módulo React, responsável por criar componentes no React.
import React from 'react';
import Header from './header';
import Footer from './footer'


// Importa os estilos CSS para o componente Footer.
import '../css/reset.css';
import '../css/index.css';
import '../css/adm-page.css';

//Criando a função de Adm que carregará a página html do Administrativo
function Adm(){
  return (
    //Elementos html criação de Div e inputs que carregarão dados do banco de dados (a ser modificados).
    <div>
      
      <Header /> 
       <div className="formulario">
        <div className="formulario-approved container">
          <h3 className="formulario-approved__titulo">Aprovar Reserva:</h3>
          <form action="" className="formulario-approved_form">
            <div className="formulario-approved__input-container">
              <input
                name="nome_reserva"
                id="reservaName"
                className="input inputs"
                type="text"
                placeholder=""
                disabled
              />
              <label className="input-label" htmlFor="reservaName">
                Nome da Reserva
              </label>
            </div>
            <div className="formulario-approved__input-container">
              <input
                name="categoria"
                id="categoriaLocal"
                className="input inputs"
                type="text"
                placeholder=""
                disabled
              />
              <label className="input-label" htmlFor="categoriaLocal">
                Categoria 
              </label>
            </div>
            <div className="formulario-approved__input-container">
              <input
                name="approvedFor"
                id="aprovadoPor"
                className="input inputs"
                type="text"
                placeholder=""
                disabled
              />
              <label className="input-label" htmlFor="aprovadorPor">
                Liberado pelo funcionário
              </label>
            </div>
            <div className="formulario-approved__input-container">
              <input
                name="reserva"
                id="reservouLocal"
                className="input inputs"
                type="text"
                placeholder=""
                disabled
              />
              <label className="input-label" htmlFor="reservouLocal">
                Reservou
              </label>
            </div>
            <div className="formulario-approved__input-container">
              <input
                name="date"
                id="dateTime"
                className="input inputs"
                type="text"
                placeholder=""
                disabled
              />
              <label className="input-label" htmlFor="dateTime">
                Data e Horário da reserva
              </label>
            </div>
            <div className="formulario-approved__input-container">
              <input
                name="expireTime"
                id="tempoLimite"
                className="input inputs"
                type="text"
                placeholder=""
                disabled
              />
              <label className="input-label" htmlFor="tempoLimite">
                Tempo limite de retirada da chave
              </label>
            </div>
            <input
              className="boton-formulario-approved"
              type="submit"
              name="aprovar"
              id="enviar-aprovado"
              value="Aprovar"
              onClick={(e) => {
                // Redireciona o usuário para a página principal
                window.location.replace("/main");
              }}
            />
            <input
              className="boton-formulario-repproved"
              type="submit"
              name="reprovar"
              id="enviar-reprovado"
              value="Reprovar"
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


)
}

export default Adm