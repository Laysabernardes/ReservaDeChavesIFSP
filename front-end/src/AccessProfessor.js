import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';



export function AccessProfessor({ children }) {

  // Cria um efeito para buscar o cargo do usuário do backend
  useEffect(() => {
  
    // Define uma função assíncrona para fazer a requisição
    async function findCargo() {
      try {
        // Faz a requisição usando axios
        const user = JSON.parse(localStorage.getItem('userData'));
        if ( user === '701001' && '701060' ) {
          return children;
        } else {
          // Caso contrário, navega para a página inicial
          return <Navigate to="/main" />;
        }
      } catch (error) {
        // Se ocorrer algum erro, trata-o de acordo
        console.error(error);
      }
    }

    // Invoca a função assíncrona
    findCargo();
  
  }, []);
      
  return (
    <div>
      {children}
      </div>
    )
  
}
