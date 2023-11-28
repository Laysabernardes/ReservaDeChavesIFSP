// Importa as bibliotecas necessárias do React e os estilos do header
import React, { useState } from 'react';
import '../css/header.css';

// Importa as imagens utilizadas no header
import { logoIF, lupaMobile, lupa } from '../img/index.js';

// Define o componente funcional Header
function Header({ locais }) {
  
  // Estados para controlar a busca
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  // Função para lidar com a mudança no campo de busca
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Função para lidar com a submissão da busca
  const handleSearchSubmit = () => {
    setSearchText('');

    // Realiza a busca (substitua isso com sua lógica de busca)
    const filteredResults = locais.filter((local) =>
      local.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    // Atualiza os resultados da busca
    setSearchResults(filteredResults);

    // Atualiza a mensagem de busca
    if (filteredResults.length > 0) {
      setSearchMessage('Resultados de busca');
    } else {
      setSearchMessage('Nenhum resultado encontrado para esta busca');
    }
  };

  // Retorna a estrutura do componente JSX
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
          {/* Campo de busca */}
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
          {/* Ícone de pesquisa (lupa) como botão */}
          <img className="header__lupa" src={lupa} alt="ícone de pesquisa" onClick={handleSearchSubmit} />
        </div>
        {/* Botão de login */}
        <a
          className="header__boton"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.replace("/");
          }}
        >
          Logout
        </a>
        {/* Ícone de pesquisa (lupa) para dispositivos móveis */}
        <img className="header__lupa-mobile" src={lupaMobile} alt="lupa" />
      </header>

      {/* Exibindo os resultados e a mensagem de busca */}
      <div>
        {/* Título dos resultados da busca */}
        <h1 className="productos__head__titulo-principal">{searchMessage}</h1>
        {/* Renderiza os resultados da busca */}
        {searchResults.map((result) => (
          <div key={result.id}>{result.nome}</div>
        ))}
      </div>
    </div>
  );
}

// Exporta o componente Header para ser utilizado em outras partes do código
export default Header;
