import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../UserContext.js';
import { useSolicitacoes } from '../SolicitacoesContext';

import '../css/banner.css';

function Banner() {
  const [mostraProf, setMostraProf] = useState(true);
  const [mostraAluno, setmostraAluno] = useState(true);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const cargo = userData.cd_cargo;

  useEffect(() => {
    switch (cargo) {
      case 'A0001':
        setMostraProf(false);
        setmostraAluno(true);
        break;
      case '701001':
        setMostraProf(false);
        setmostraAluno(false);
      default:
        setMostraProf(true);
        setmostraAluno(false);
    }
  }, [cargo]);

  return (
    <section className='banner'>
      <div className='banner__conteudo container'>
        <h2 className='banner__titulo'>Campus Cubatão</h2>
        <p className='banner__texto'>Sistema de reserva de chaves.</p>

        {/* Renderiza o botão somente se mostraProf for true */}
        {mostraProf && (
          <button
            className="banner__botao"
            onClick={() => {
              setTimeout(() => {
                navigate('/pedidos');
              }, 100);
            }}
          >
            Pedidos de acesso de Alunos
          </button>
        )}
        {/* Renderiza o botão somente se mostraProf for true */}
        {mostraAluno && (
          <button
            className="banner__botao"
            onClick={() => {
              setTimeout(() => {
                navigate('/pedidosEstudante');
              }, 100);
            }}
          >
            Verificar suas permissões
          </button>
        )}
          <button
            className="banner__botao reservas__botao"
            onClick={() => {
              setTimeout(() => {
                navigate('/acompanharPedidos');
              }, 100);
            }}
          >
            Verificar suas reservas
          </button>
      </div>
    </section>
  );
}

export default Banner;
