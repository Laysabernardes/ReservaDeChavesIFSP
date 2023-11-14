import React from 'react';
import '../css/main.css'; // Importa o estilo CSS para o componente main

function Main() {
  return (
   <div className="section__produtos">
        <div className="produtos container">
            <div className="salas">       
                <div className="produtos__head">
                    <h1 className="produtos__head__titulo-principal">Todos los produtos</h1>
                </div>
                <div className="produtos_admin" data-produtos-admin>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Main;