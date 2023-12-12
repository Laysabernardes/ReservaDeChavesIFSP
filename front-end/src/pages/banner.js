import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../UserContext.js';
import { useSolicitacoes } from '../SolicitacoesContext';

import '../css/banner.css';

function Banner() {
  //variaveis de estados
  const [mostraAdm, setMostraAdm] = useState(true);
  const [mostraProf, setMostraProf] = useState(true);
  const [mostraAluno, setmostraAluno] = useState(true);
  const [mostraDefault, setmostraDefault] = useState(true);

  //função para fazer a navegação entre as páginas
  const navigate = useNavigate();

  //função que armazenas as informações de login
  const userData = JSON.parse(localStorage.getItem('userData'));

  //constante com as informções do cargo 
  const cargo = userData.cd_cargo;

  //Executa efeito assíncrono em componentes React.
  useEffect(() => {

    //switch case para determiados cargos
    //dependendo do cargo vai mostar ou não itens no menu
    switch (cargo) {
      case 'A0001':
        setMostraAdm(false)
        setMostraProf(false);
        setmostraAluno(true);
        setmostraDefault(false);
        break;
      case '701001':
        setMostraAdm(true)
        setMostraProf(false);
        setmostraDefault(false);
        setmostraAluno(false);
        break;
      case '707001':
        setMostraAdm(false)
        setMostraProf(true);
        setmostraAluno(false);
        setmostraDefault(false);
        break;
      default:
        setMostraAdm(false)
        setMostraProf(false);
        setmostraAluno(false);
        setmostraDefault(true);
        break;
    }
  }, [cargo]);

  return (
    <section className='banner'>
      <div className='banner__conteudo container'>
        <h2 className='banner__titulo'>Campus Cubatão</h2>
        <p className='banner__texto'>Sistema de reserva de chaves.</p>

        {/* Renderiza o botão somente se mostraProf for true */}
        {mostraProf && (<>
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
        </>
        )}
        {/* Renderiza o botão somente se mostraAluno for true */}
        {mostraAluno && (<>
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
        </>
          
        )}
        {/* Renderiza o botão somente se mostraAdm for true */}
        {mostraAdm && (
          <button
            className="banner__botao"
            onClick={() => {
              setTimeout(() => {
                navigate('/pedidosAdm');
              }, 100);
            }}
          >
            Verificar pedidos de reserva
          </button>
        )}
        {/* Renderiza o botão somente se mostraDefault for true */}
        {mostraDefault && (
          <button
            className="banner__botao"
            onClick={() => {
              setTimeout(() => {
                navigate('/acompanharPedidos');
              }, 100);
            }}
          >
            Verificar pedidos de reserva
          </button>
        )}
      </div>
    </section>
  );
}

export default Banner;
