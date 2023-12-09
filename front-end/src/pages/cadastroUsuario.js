import React, { useState, useEffect } from 'react';
import Header from './header.js';
import Footer from './footer.js';
import '../css/cadastroChave.css';

import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate

import api from '../api';

function CadastroUser() {

    const [mensagem, setMensagem] = useState('');

    const [matricula, setMatricula] = useState('');
    const [cargo, setcargo] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    // Obtém a função navigate do React Router para redirecionamento
    const navigate = useNavigate();
    const location = useLocation();

    // Obtém dados do usuário do armazenamento local (localStorage)
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Define o prontuário e o nome do usuário com base nos dados do usuário, se disponíveis
    const prontuario = userData ? userData.cd_matricula_usuario : 'N/A';
    const userName = userData ? userData.nm_usuario : 'Usuário';

    const payload = {
        cd_matricula_usuario: matricula,
        cd_cargo: cargo,
        cd_senha_usuario: senha,
        nm_usuario: nome,
    };    

    const criarUsuario = async () => {
        const response = await api.post('/user/criar', payload);

        setMensagem('Usuario criado com sucesso!');
        console.log("Usuario criado:", response.data);
        console.log("tudo", payload);
    }

    const userExiste = async () => {
        const response = await api.get(`user/nome/${payload.cd_matricula_usuario}`);
        console.log(response.data.usuario)
        if (response.data.usuario === false) {
            console.log("tudo2",payload);
            criarUsuario()
            return
        } else {
            setMensagem("Usuario já cadastrado!");
            return
        }
    }
    

    const buscarCargo = async () => {
        try {
            // Faz uma chamada à API, com o código padrão de professores como parâmetro
            const response = await api.get(`/user/tbcargo`);
            // Obtém os dados da resposta da API
            const dadosCargo = response.data;
            // Verifica se a resposta da API contém dados do usuário
            if (dadosCargo && dadosCargo.length > 0) {
                // Obtém o nome do professor
                const cargo = dadosCargo[0].cd_cargo;
                // Imprime o nome do professor
                console.log("nome:", cargo);
                // Retorna o nome do estudante
                return dadosCargo;
            } else {
                // Erro: a resposta da API não contém dados do usuário
                console.error('Resposta da API não contém dados de usuário:', dadosCargo);
                // Retorna 'Nome não encontrado'
                return 'Nome não encontrado';
            }
        } catch (error) {
            // Erro ao fazer a chamada à API
            console.error('Erro ao buscar nome do Professor:', error);
            // Retorna 'Nome não encontrado'
            return 'Nome não encontrado';
        }
    }
    const optionComboBoxCargo = async () => {
        try {
            // Chama a função para buscar os nomes dos professores na API
            const arrayCargos = await buscarCargo();

            // Obtém a referência ao elemento select
            const selectCargo = document.querySelector('select[name="select-cargo"]');

            // Limpa as opções existentes no select
            selectCargo.innerHTML = "";

            // Adiciona uma opção padrão
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.text = "Selecione um cargo";
            selectCargo.appendChild(defaultOption);

            // Adiciona as opções com os nomes dos professores
            arrayCargos.forEach((cargo) => {
                const option = document.createElement("option");
                option.value = cargo.cd_cargo;
                option.text = cargo.ds_cargo;
                selectCargo.appendChild(option);
            });

            // Adiciona um ouvinte de evento para capturar a matrícula selecionada
            selectCargo.addEventListener('change', function () {
                // Obtém o código do cargo selecionado
                const cargoSelecionado = arrayCargos.find(cargo => cargo.cd_cargo === this.value)?.cd_cargo;
                console.log('Código do cargo selecionado:', cargoSelecionado);
                console.log("tudo",payload);
            });

        } catch (error) {
            // Trate os erros, se necessário
            console.error('Erro ao preencher as opções do combo box:', error);
        }
       

    }

    useEffect(() => {

        optionComboBoxCargo();
    }, []);


    return (
        <div>
            <Header />
            <div className="formulario_cadastro_area">
                <div className="formulario-cadastro container">

                    <h3 className="formulario-cadastro__titulo">Cadastrar Usuario:</h3>
                    {mensagem && <p className='mensagem'>{mensagem}</p>}
                    <form action="" className="formulario-cadastro_form">

                        <div className="formulario-cadastro__input-container">
                            <input
                                name="nome_reserva"
                                id="reservaName"
                                className="input inputs"
                                type="text"
                                placeholder=""
                                required
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <label className="input-label" htmlFor="reservaName">
                                Nome:
                            </label>
                        </div>

                        <div className="formulario-cadastro__input-container">
                            <input
                                name="nome_reserva"
                                id="reservaName"
                                className="input inputs"
                                type="text"
                                placeholder=""
                                required
                                oninput="formatarProntuario(this)"
                                onChange={(e) => setMatricula(e.target.value)}
                            />
                            <label className="input-label" htmlFor="reservaName">
                                Matricula:
                            </label>
                            <div class="hint">Formato esperado: CB1234567</div>
                        </div>

                        <div className="formulario-cadastro__input-container">
                            <input
                                name="nome_reserva"
                                id="reservaName"
                                className="input inputs"
                                type="password"
                                placeholder=""
                                required
                                oninput="formatarProntuario(this)"
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <label className="input-label" htmlFor="reservaName">
                                Senha:
                            </label>
                        </div>

                        <div className='formulario-approved__input-container'>
                            <label for="select-cargo" className='input-label'>Cargo:</label>
                            <select name="select-cargo" className="input inputs"
                                onChange={(e) => setcargo(e.target.value)}>
                                <option value="cargo">Cargo X</option>
                            </select>
                        </div>
                        <button
                            className="boton-formulario-approved"
                            type="button"
                            onClick={userExiste}
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

export default CadastroUser;

