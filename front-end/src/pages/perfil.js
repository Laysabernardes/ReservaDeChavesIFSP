import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { useUser } from '../UserContext.js';
import Header from './header';
import Footer from './footer';
import '../css/perfil.css';
import '../css/reset.css';
import '../css/index.css';
import '../css/login.css';

function PaginaPerfil() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = useUser();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordChangeError, setPasswordChangeError] = useState(false);
    const [passwordChangeMessage, setPasswordChangeMessage] = useState('');

    const prontuario = userData ? userData.cd_matricula_solicitante : 'N/A';
    const userName = userData ? userData.nm_solicitante : 'Usuário';

    const [showChangePassword, setShowChangePassword] = useState(false);

    async function handleChangePassword(e) {
        e.preventDefault();

        try {
            if (userData && userData.cd_senha_solicitante && currentPassword === userData.cd_senha_solicitante && newPassword === confirmNewPassword) {
                const response = await api.patch('/user/senha', {
                    cd_matricula_solicitante: prontuario,
                    cd_senha_solicitante: newPassword,
                });
                setPasswordChangeMessage('Senha alterada com sucesso!');
            } else {
                if (!userData || !userData.cd_senha_solicitante) {
                    setPasswordChangeMessage('Dados do usuário ausentes.');
                } else if (currentPassword !== userData.cd_senha_solicitante) {
                    setPasswordChangeMessage('Senha antiga incorreta.');
                } else if (newPassword !== confirmNewPassword) {
                    setPasswordChangeMessage('A nova senha e a confirmação não coincidem.');
                }
            }
        } catch (error) {
            setPasswordChangeMessage('Erro ao trocar a senha. Tente novamente mais tarde.');

            console.error('Erro ao trocar a senha:', error);
        }
    }

    return (
        <div className="App">
            <Header />

            <div className="main-content">
                <div className="formulario">
                    <div className="formulario-login container">
                        <h2 className="formulario-login__titulo">Bem-vindo, {userName}!</h2>

                        {passwordChangeMessage && <p>{passwordChangeMessage}</p>}

                        {showChangePassword ? (
                            <form className="formulario-login_form" onSubmit={handleChangePassword}>
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
                                <button className="boton-formulario-login" type="submit">
                                    Trocar Senha
                                </button>
                            </form>
                        ) : (
                            <div>
                                <h3>Informações do perfil:</h3>
                                <p>Prontuário: {prontuario}</p>

                                {/* Adicione outras informações do perfil conforme necessário */}
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
            <Footer />
        </div>
    );
}

export default PaginaPerfil;
