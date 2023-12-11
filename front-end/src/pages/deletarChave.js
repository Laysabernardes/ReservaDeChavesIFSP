import React, { useState, useEffect } from 'react';
import Header from './header.js';
import Footer from './footer.js';
import '../css/cadastroChave.css';

import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate

import api from '../api';

function DeletarChave() {

    const [mensagem, setMensagem] = useState('');
    const [nmChave, setNmChave] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dsObs, setDsObs] = useState('');

    const [local, setLocal] = useState('');

    // Obtém a função navigate do React Router para redirecionamento
    const navigate = useNavigate();
    const location = useLocation();

    // Obtém dados do usuário do armazenamento local (localStorage)
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Define o prontuário e o nome do usuário com base nos dados do usuário, se disponíveis
    const prontuario = userData ? userData.cd_matricula_usuario : 'N/A';
    const userName = userData ? userData.nm_usuario : 'Usuário';



    const deletar = async () => {
        try {
            const response = await api.delete(`/chaves/${payload.cd_chave}`);
            console.log(response.data);

            // Verifica se a exclusão foi bem-sucedida com base no status da resposta
            if (response.status === 201) {
                setMensagem('Chave excluída com sucesso!');
            } else {
                setMensagem('Falha ao excluir a chave. Por favor, tente novamente.');
            }
        } catch (error) {
            setMensagem('Erro ao excluir a chave. Por favor, tente novamente.');
            console.error('Erro ao excluir chave:', error);
        }
    };


    const optionComboBoxLocal = async () => {
        try {
            // Chama a função para buscar todos os nomes de locais na API
            const response = await api.get('/chaves/');
            const arrayLocais = response.data;
            console.log(arrayLocais)
            console.log(typeof (arrayLocais))

            // Obtém a referência ao elemento select
            const selectLocal = document.querySelector('select[name="select-local"]');

            // Limpa as opções existentes no select
            selectLocal.innerHTML = "";

            // Adiciona uma opção padrão
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.text = "Selecione um local";
            selectLocal.appendChild(defaultOption);

            // Adiciona as opções com os nomes dos locais
            arrayLocais.forEach((local) => {
                const option = document.createElement("option");
                option.value = local.cd_chave;
                option.text = local.nm_chave;
                selectLocal.appendChild(option);
            });
        } catch (error) {
            // Trate os erros, se necessário
            console.error('Erro ao preencher as opções do combo box:', error);
        }
    }

    const payload = {
        cd_chave: local
    };
    console.log('cpntecudo', payload);
    useEffect(() => {

        optionComboBoxLocal();
        // Imprime o valor da variável de estado `temSolicitacoesPendentes`
    }, []);

    return (
        <div>
            <Header />
            <div className="formulario_cadastro_area">
                <div className="formulario-cadastro container">
                    <div className='container_botao'>
                        <a className="local_botao" href="/main"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/main', { state: { user: userData } })
                            }}>Voltar:</a>
                    </div>

                    <h3 className="formulario-cadastro__titulo">Deletar Chave:</h3>


                    <form action="" className="formulario-cadastro_form">
                        {mensagem && <p className='mensagem_deletar'>{mensagem}</p>}
                        <div className='formulario-approved__input-container'>
                            <label for="select-local" className='input-label'>Local:</label>
                            <select name="select-local" className="input inputs"
                                onChange={(e) => setLocal(e.target.value)}>
                                <option value="sala">Sala X</option>
                            </select>
                        </div>

                        <button
                            className="boton-formulario-approved"
                            type="button"
                            onClick={deletar}
                        >
                            Deletar Local
                        </button>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DeletarChave;

