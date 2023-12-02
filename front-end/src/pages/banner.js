// Arquivo: Banner.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

import '../css/banner.css';  // Importa o estilo CSS para o componente Header

function Banner() {
  const navigate = useNavigate();
  

  return (
    // Elemento React representando a estrutura do HTML
    <section className='banner'>
        <div className='banner__conteudo container'>
            <h2 className='banner__titulo'>Campus Cubatão</h2>
            <p className='banner__texto'>Sistema de reserva de chaves.</p>
            <a
                href="/mostraChave"
                className="banner__botao"
                onClick={() => navigate('/mostraChave' /*ADICIONAR LOCATION*/)}
            >
                Ver chaves
            </a>
        </div>
    </section>
  );
}

export default Banner;  // Exporta o componente Banner para ser usado em outros lugares do projeto
