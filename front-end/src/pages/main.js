import React from 'react';
import '../css/main.css'; // Importa o estilo CSS para o componente main

function Main() {
  return (
    <section class="section__produtos">    
        <div className="produtos container">
            <div className="salas">       
                <div className="salas__head">
                    <h2 className="salas__head__titulo-principal">Salas:</h2>
                </div>
                <div className="produtos_index" data-salas></div>
            </div>
            <div className="labs">       
                <div className="labs__head">
                    <h2 className="labs__head__titulo-principal">Laboratórios:</h2>
                </div>
                <div className="produtos_index" data-labs></div>
            </div>
            <div className="diversos">       
                <div className="diversos__head">
                    <h2 className="diversos__head__titulo-principal">Diversos:</h2>
                </div>
                <div className="produtos_index" data-diversos></div>
            </div>
        </div>
    </section> 
    );
}

export default Main;