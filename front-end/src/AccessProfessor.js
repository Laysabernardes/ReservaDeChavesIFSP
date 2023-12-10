import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function AccessProfessor({ children, }) {  
  // Cria um hook para navegar entre as rotas
  const navigate = useNavigate();

  // Cria um efeito para buscar o cargo do usuário do backend
  useEffect(() => {
    // Define uma função assíncrona para fazer a requisição
    async function findCargo() {
      try {
        // Faz a requisição 
        const user = JSON.parse(localStorage.getItem('userData'));
        // Verifica se o código do usuário é o esperado
        if ( user.cd_cargo === '701001' || user.cd_cargo === '701060') {
          // Caso o usuário não seja o esperado, navega para a página inicial
         return children
        }
        else{
          navigate("/main", { replace: true });
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
