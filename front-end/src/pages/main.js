import React from 'react';
import '../css/main.css'; // Importa o estilo CSS para o componente main

function Main() {
  return (
   <div className="seccion__productos">
            <div className="productos container">
                <div className="star_wars">       
                    <div className="productos__head">
                        <h1 className="productos__head__titulo-principal">Todos los productos</h1>
                    </div>
                    <div className="productos_admin" data-productos-admin>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Main();