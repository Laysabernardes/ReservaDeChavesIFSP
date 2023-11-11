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
              <li className="footer__link"><a href="https://cbt.ifsp.edu.br/">IFSP - Campus Cubatão</a></li>
              <li className="footer__link"><a href="https://suap.ifsp.edu.br/accounts/login/?next=/">Suap</a></li>
              <li className="footer__link"><a href="../screens/error404.html">Menu</a></li>
              <li className="footer__link"><a href="../screens/error404.html">##</a></li>
              <li className="footer__link"><a href="../screens/error404.html">##</a></li>
              <li className="footer__link"><a href="../screens/error404.html">##</a></li>
            </ul>
          </div>
          {/* Formulário de contato no Footer */}
          <div className="footer_formulario">
            {/* Título do formulário */}
            <h3 className="footer_formulario__titulo">Fale conosco</h3>
            {/* Formulário contendo campos de entrada e botão de envio */}
            <form action="">
              {/* Campo de entrada para o nome */}
              <div className="formulario__input-container">
                <input name="name" id="name" className="input inputs" type="text" placeholder="" required data-tipo="nombre" />
                <label className="input-label" htmlFor="name">Nome:</label>
                <span className="input-message-error">Este campo não é valido</span>
              </div>
              {/* Área de texto para a mensagem */}
              <div className="formulario__textarea-container">
                <textarea name="mensaje" id="mensaje" className="textarea inputs" rows="5" type="text" placeholder="" required data-tipo="mensaje"></textarea>
                <label className="input-label" htmlFor="mensaje">Escreva sua mensagem</label>
                <span className="input-message-error">Este campo não é valido</span>
              </div>
              {/* Botão de envio do formulário */}
              <input className="boton-form" type="submit" name="enviar" id="enviar" value="Enviar Mensagem" />
            </form>
          </div>
        </div>
      </section>
      
      {/* Rodapé adicionado abaixo */}
      <footer className="rodape">
        {/* Textos informativos no rodapé */}
        <p className="rodape__texto">Desenvolvido pela turma de ADS - 2º Semestre</p>
        <p className="rodape__texto">2023</p>
      </footer>
    </div>
  );
}

// Exporta o componente Footer para ser utilizado em outros arquivos.
export default Footer;
