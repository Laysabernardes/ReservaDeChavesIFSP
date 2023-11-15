// Importa o módulo React, responsável por criar componentes no React.
import React from 'react';
import Header from './header';
import Footer from './footer'


// Importa os estilos CSS para o componente Footer.
import '../css/reset.css';
import '../css/index.css';
import '../css/adm-page.css';

function Adm(){
  return (
    <div>
      <Header/> 
      <div className="principal">
        <div className="inputs">
         <h1>Aprovar Reserva:</h1>
         <input type="text" placeholder='Nome da Reserva'></input>
         <input type="text" placeholder='Categoria'></input>
         <input type="text" placeholder='Reservou'></input>
          <input type="datetime-local" placeholder='Data e Hora da reserva'></input>
          <select placeholder='Tempo de expiração'>
            <option value='0'>Selecione</option>
            <option value='10'>10 minutos</option>
            <option value='20'>20 minutos</option>
             <option value='30'>30 minutos</option>
         </select>
          <input type="button" value="Aprovar" className='approved'></input>

          </div>
      

      </div>
      
      <Footer />
      </div>



)
}

export default Adm