import React, { useState } from 'react';
import '../css/header.css';
import { logoIF, lupaMobile, lupa } from '../img/index.js';

function Header({ locais }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchText('');

    // Realizar a busca (substitua isso com sua lógica de busca)
    const filteredResults = locais.filter((local) =>
      local.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    // Atualizar os resultados da busca
    setSearchResults(filteredResults);

    // Atualizar a mensagem de busca
    if (filteredResults.length > 0) {
      setSearchMessage('Resultados de busca');
    } else {
      setSearchMessage('Nenhum resultado encontrado para esta busca');
    }
  };

  return (
    <div>
      <header className="header container">
        <div className="header_info">
          <a href="https://cbt.ifsp.edu.br/">
            <img className="header__logo" src={logoIF} alt="logo do Instituto Federal de São Paulo" />
          </a>
          <p className="header__titulo">Reserva de Locais</p>
          <input
            className="header__input"
            type="text"
            placeholder="O que deseja encontrar"
            value={searchText}
            onChange={handleSearchChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
          />
          {/* Use a imagem diretamente como conteúdo do botão */}

          <img className="header__lupa" src={lupa} alt="ícone de pesquisa" onClick={handleSearchSubmit} />

        </div>
        <a
          className="header__boton"
          href="/login"
          onClick={(e) => {
            e.preventDefault();
            window.location.replace("/login");
          }}
        >
          Login
        </a>
        <img className="header__lupa-mobile" src={lupaMobile} alt="lupa" />
      </header>

      {/* Exibindo os resultados e a mensagem de busca */}
      <div>
        <h1 className="productos__head__titulo-principal">{searchMessage}</h1>
        {/* Renderizar os resultados aqui */}
        {searchResults.map((result) => (
          /* Renderize seus resultados conforme necessário */
          <div key={result.id}>{result.nome}</div>
        ))}
      </div>
    </div>
  );
}

export default Header;
