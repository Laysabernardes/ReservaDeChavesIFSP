// Importa o módulo React, responsável por criar componentes no React.
import React from 'react';

// Importa os estilos CSS para o componente Footer.
import '../css/reset.css';
import '../css/index.css';
import '../css/footer.css';

// Importa a imagem do logo do Instituto Federal.
import { logoIF } from '../img/index.js';

// Função que representa o componente Footer.
function Footer() {
  return (
    <div>
      {/* Seção do Footer contendo informações e formulário de contato */}
      <section className="footer">
        {/* Container para organizar o conteúdo do Footer */}
        <div className="conteudo__footer container">
          {/* Informações do Footer, como o logo e links */}
          <div className="conteudo__footer_info">
            {/* Container do logo do IF e título "Reserva de Chaves" */}
            <div className="container__logo">
              {/* Link para a página inicial */}
              <a href="../index.html">
                {/* Imagem do logo do IF */}
                <img className="footer__logo" src={logoIF} alt="logo do Instituto federal de São Paulo" />
              </a>
              {/* Título do Footer */}
              <p className="footer__titulo">Reserva de Chaves</p>
            </div>
            {/* Lista de links no Footer */}
            <ul className="footer_container_links">
              <li className="footer__link"><a href="https://cbt.ifsp.edu.br/">IFSP - CBT</a></li>
              <li className="footer__link">
                <a href="/main" onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/main");
                }}>
                  Home
                </a></li>
                <li className="footer__link">
                <a href="/mostraChave" onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/mostraChave");
                }}>
                  Chaves
                </a></li>
              <li className="footer__link">
                <a href="/perfil" onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/perfil");
                }}>
                  Perfil
                </a></li>
            </ul>
          </div>
          {/* Formulário de contato no Footer */}
          <div className="footer_formulario">
            {/* Título do formulário */}
            <h3 className="footer_formulario__titulo">Sobre o Projeto:</h3>
            <p className="texto_footer">Desenvolvido pelos alunos do curso de Análise e Desenvolvimento de Sistemas (ADS) do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo, Campus Cubatão, como parte integrante das aulas de Banco de Dados I e Programação Orientada a Objetos do 2º semestre, sob a orientação do professor Nelson Nascimento Junior.
            </p>
          </div>
        </div>
      </section>

      {/* Rodapé adicionado abaixo */}
      <footer className="rodape">
        {/* Textos informativos no rodapé */}
        <p className="rodape__texto">
          Desenvolvido por
          <a href="https://www.linkedin.com/in/laysabernardes/" target="_blank"> Laysa Bernardes</a>,
          <a href="https://www.linkedin.com/in/lucas-lopes-781b39263/" target="_blank"> Lucas Lopes</a>,
          <a href="https://www.linkedin.com/in/miguel-luizatto/" target="_blank"> Miguel Luizatto</a>,
          <a href="URL_DO_PERFIL_LINKEDIN_BEATRIZ" target="_blank"> Beatriz Bastos</a>,
          <a href="https://www.linkedin.com/in/eduardo-miranda-silva-sousa-49b768165/" target="_blank"> Eduardo Miranda</a>,
          <a href="https://www.linkedin.com/in/maria-eduarda-fodor-588a01209/" target="_blank"> Maria Eduarda Fodor </a>
          alunos de ADS - 2 semestre de 2023
        </p>
      </footer>
    </div>
  );
}

// Exporta o componente Footer para ser utilizado em outros arquivos.
export default Footer;
