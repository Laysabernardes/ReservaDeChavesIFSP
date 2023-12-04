import { useLocation } from "react-router-dom";
// Importa as bibliotecas necessárias do React e os estilos do header
import React, { useState } from 'react';
import '../css/header.css';

// Importa as imagens utilizadas no header
import { logoIF, lupaMobile, lupa } from '../img/index.js';

// Define o componente funcional Header
function Header({ locais }) {
  const location = useLocation();
  const paginaEspecifica = "/";
  
  return (
    <div>
      {/* Cabeçalho da página */}
      <header className="header container">
        <div className="header_info">
          {/* Link para a página principal do Instituto Federal */}
          <a href="https://cbt.ifsp.edu.br/">
            {/* Logo do Instituto Federal de São Paulo */}
            <img className="header__logo" src={logoIF} alt="logo do Instituto Federal de São Paulo" />
          </a>
          {/* Título do sistema de reserva de locais */}
          <p className="header__titulo">Reserva de Locais</p>
          
          {/*Botão de logout invisivel para a página de login */}
          {location.pathname !== paginaEspecifica && <a 
          className="header__boton"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.replace("/");
          }}
        >
          Logout
        </a>}
        </div>
        
        
    </header>
      </div>
  );
}

export default Header;
