import React from 'react';
import '../css/header.css';  // Importa o estilo CSS para o componente Header
import { logoIF, lupaMobile, lupa } from '../img/index.js';  // Importa as imagens do ícone do IF, ícone de pesquisa para dispositivos móveis e ícone de pesquisa


function Header() {
  return (
    // Elemento React representando a estrutura do HTML
    <div>
      {/* Cabeçalho da página */}
      <header className="header container">
        {/* Seção de informações do cabeçalho */}
        <div className="header_info">
          {/* Link para a página principal */}
          <a href="https://cbt.ifsp.edu.br/">
            {/* Logo do Instituto Federal de São Paulo */}
            <img className="header__logo" src={logoIF} alt="logo do Instituto Federal de São Paulo" />
          </a>
          {/* Nome da página */}
          <p className="header__titulo">Reserva de Chaves</p>
          {/* Campo de entrada de texto para pesquisa */}
          {/* data-buscador e parte back-end/controller */}
          <input className="header__input" type="text" placeholder="O que deseja encontrar" data-buscador />
          {/* Ícone de pesquisa */}
          <img className="header__lupa" src={lupa} alt="lupa" />
        </div>
        {/* Link para a página de login */}
        <a
  className="header__boton"
  href="/login"
  onClick={(e) => {
    // Redireciona o usuário para a página de login
    window.location.replace("/login");
  }}
>
  Login
</a>
        {/* Ícone de lupa para dispositivos móveis, não aparece em desktop */}
        <img className="header__lupa-mobile" src={lupaMobile} alt="lupa" />
      </header>
    </div>
  );
}

export default Header;
