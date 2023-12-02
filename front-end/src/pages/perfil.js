// Importa as bibliotecas e módulos necessários do React e do React Router DOM
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { useUser } from '../UserContext.js';
import Header from './header';
import Footer from './footer';

// Importa os arquivos de estilo necessários
import '../css/perfil.css';
import '../css/reset.css';
import '../css/index.css';
import '../css/login.css';

// Define o componente funcional PaginaPerfil
function PaginaPerfil() {
    // Obtém funções e dados do React Router DOM e do contexto do usuário
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = useUser();

    // Define estados para armazenar informações relacionadas à alteração de senha
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordChangeError, setPasswordChangeError] = useState(false);
    const [passwordChangeMessage, setPasswordChangeMessage] = useState('');

    // Obtém o prontuário e o nome do usuário ou define valores padrão se não estiverem disponíveis
    const prontuario = userData ? userData.cd_matricula_solicitante : 'N/A';
    const userName = userData ? userData.nm_solicitante : 'Usuário';

    // Define um estado para controlar a exibição do formulário de alteração de senha
    const [showChangePassword, setShowChangePassword] = useState(false);

    // Define a função assíncrona para lidar com a alteração de senha
    async function handleChangePassword(e) {
        e.preventDefault();

        try {
            // Verifica se os dados do usuário estão presentes e se a senha atual corresponde à senha no contexto do usuário
            if (userData && userData.cd_senha_solicitante && currentPassword === userData.cd_senha_solicitante && newPassword === confirmNewPassword) {
                // Envia uma solicitação para a API para alterar a senha
                const response = await api.patch('/user/senha', {
                    cd_matricula_solicitante: prontuario,
                    cd_senha_solicitante: newPassword,
                });
                // Define uma mensagem de sucesso se a alteração de senha for bem-sucedida
                setPasswordChangeMessage('Senha alterada com sucesso!');
            } else {
                // Lida com diferentes cenários de erro e define mensagens apropriadas
                if (!userData || !userData.cd_senha_solicitante) {
                    setPasswordChangeMessage('Dados do usuário ausentes.');
                } else if (currentPassword !== userData.cd_senha_solicitante) {
                    setPasswordChangeMessage('Senha antiga incorreta.');
                } else if (newPassword !== confirmNewPassword) {
                    setPasswordChangeMessage('A nova senha e a confirmação não coincidem.');
                }
            }
        } catch (error) {
            // Lida com erros durante a alteração de senha e exibe uma mensagem de erro
            setPasswordChangeMessage('Erro ao trocar a senha. Tente novamente mais tarde.');
            console.error('Erro ao trocar a senha:', error);
        }
    }

    // Retorna a estrutura do componente
    return (
        <div className="App">
            {/* Renderiza os componentes Header e Footer */}
            <Header />

            {/* Renderiza o conteúdo principal da página */}
            <div className="main-content">
                <div className="formulario">
                    <div className="formulario-login container">
                        {/* Exibe uma saudação personalizada ao usuário */}
                        <h2 className="formulario-login__titulo">Bem-vindo, {userName}!</h2>

                        {/* Exibe mensagens relacionadas à alteração de senha, se houver */}
                        {passwordChangeMessage && <p>{passwordChangeMessage}</p>}

                        {/* Renderiza o formulário de alteração de senha ou informações do perfil, dependendo do estado */}
                        {showChangePassword ? (
                            <form className="formulario-login_form" onSubmit={handleChangePassword}>
                                {/* Campos para inserir a senha atual, nova senha e confirmação de nova senha */}
                                <div className="formulario-login__input-container">
                                    <input
                                        name="password"
                                        type="password"
                                        className="input inputs"
                                        placeholder="Senha Atual"
                                        required
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <label className="input-label" htmlFor="login">
                                        Escreva sua senha atual:
                                    </label>
                                    <span className="input-message-error">Este campo não é válido</span>
                                </div>
                                <div className="formulario-login__input-container">
                                    <input
                                        name="password"
                                        type="password"
                                        className="input inputs"
                                        placeholder="Nova Senha"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <label className="input-label" htmlFor="senha">
                                        Escreva sua Nova senha
                                    </label>
                                    <span className="input-message-error">Este campo não é válido</span>
                                </div>
                                <div className="formulario-login__input-container">
                                    <input
                                        name="password"
                                        type="password"
                                        className="input inputs"
                                        placeholder="Confirmar Nova Senha"
                                        required
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    <label className="input-label" htmlFor="senha">
                                        Confirme sua nova senha
                                    </label>
                                    <span className="input-message-error">Este campo não é válido</span>
                                </div>
                                {/* Botão para enviar o formulário de alteração de senha */}
                                <button className="boton-formulario-login" type="submit">
                                    Trocar Senha
                                </button>
                            </form>
                        ) : (
                            <div>
                                {/* Exibe informações do perfil, como o prontuário do usuário */}
                                <h3>Informações do perfil:</h3>
                                <p>Prontuário: {prontuario}</p>

                                {/* Adicione outras informações do perfil conforme necessário */}
                                
                                {/* Botão para mostrar o formulário de alteração de senha */}
                                <button
                                    className="boton-formulario-login"
                                    onClick={() => setShowChangePassword(true)}
                                >
                                    Mudar Senha
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Renderiza o componente Footer */}
            <Footer />
        </div>
    );
}

// Exporta o componente PaginaPerfil como componente padrão
export default PaginaPerfil;
