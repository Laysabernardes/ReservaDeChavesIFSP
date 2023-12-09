import React, { useState, useEffect } from 'react';
import Header from './header.js';
import Footer from './footer.js';
import '../css/cadastroChave.css';

import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate

import api from '../api';

function Cadastro() {

  const [mensagem, setMensagem] = useState('');
  const [nmChave, setNmChave] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dsObs, setDsObs] = useState('');

  // Obtém a função navigate do React Router para redirecionamento
  const navigate = useNavigate();
  const location = useLocation();

  // Obtém dados do usuário do armazenamento local (localStorage)
  const userData = JSON.parse(localStorage.getItem('userData'));

  // Define o prontuário e o nome do usuário com base nos dados do usuário, se disponíveis
  const prontuario = userData ? userData.cd_matricula_usuario : 'N/A';
  const userName = userData ? userData.nm_usuario : 'Usuário';

  const payload = {
    nm_chave: nmChave,
    ds_chave: categoria,
    ds_status: "livre",
    ds_obs_chave: dsObs
  };

  const criarChave = async () => {
    const response = await api.post('/chaves', payload);

    setMensagem('Chave Criada com sucesso!');
    console.log("Criada a chave:", response.data);
  }

  const chaveExiste = async () => {
    const response = await api.get(`/chaves/nome/${payload.nm_chave}`);
    console.log(response.data.chave)
    if(response.data.chave === false){
      criarChave()
      return
    } else {
      setMensagem("Já existe esta chave!");
      return
    }
  }

  return (
    <div>
      <Header />
      <div className="formulario_cadastro_area">
        <div className="formulario-cadastro container">
          <h3 className="formulario-cadastro__titulo">Cadastrar Chave:</h3>
          {mensagem && <p className='mensagem'>{mensagem}</p>}
          <form action="" className="formulario-cadastro_form">
            <div className="formulario-cadastro__input-container">
              <input
                name="nome_reserva"
                id="reservaName"
                className="input inputs"
                type="number"
                placeholder=""
                required
                onChange={(e) => setNmChave(e.target.value)}
              />
              <label className="input-label" htmlFor="reservaName">
                Número da chave:
              </label>
            </div>

            <div className="formulario-cadastro__input-container input ">

              <label className="input-label" htmlFor="categoriaLocal">
                Tipo de sala:
              </label>
              <div className="radio-buttons-container">
                <div className='centralizar'>
                  <input
                    type="radio"
                    id="sala"
                    name="categoria"
                    value="sala"
                    required
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  <label htmlFor="sala">Sala</label>
                </div>
                <div className='centralizar'>
                  <input
                    type="radio"
                    id="laboratorio"
                    name="categoria"
                    value="laboratorio"
                    required
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  <label htmlFor="laboratorio">Laboratório</label>
                </div>

                <div className='centralizar'>
                  <input
                    type="radio"
                    id="outro"
                    name="categoria"
                    value="outro"
                    required
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  <label htmlFor="outro">Outro</label>
                </div>

              </div>
            </div>
            <div className="formulario-cadastro__input-container">
              <input
                name="cadastroFor"
                id="aprovadoPor"
                className="input inputs"
                type="text"
                placeholder=""
                onChange={(e) => setDsObs(e.target.value)}
              />

              <label className="input-label" htmlFor="aprovadorPor">
                Observações adicionais:
              </label>
            </div>

            <button
                    className="boton-formulario-approved"
                    type="button"
                    onClick={chaveExiste}
                  >
                    Aceitar
            </button>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cadastro;

