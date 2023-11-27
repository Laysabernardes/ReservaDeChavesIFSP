// Importa as bibliotecas necessárias do React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

// Importa a instância configurada do Axios do arquivo api.js
import api from '../api'; // Caminho para o arquivo api.js

// Importa os estilos para esta página
import '../css/reset.css';
import '../css/index.css';
import '../css/login.css';

// Importa componentes de cabeçalho e rodapé
import Header from './header';
import Footer from './footer';
import Routes from '../Routes.js';


// Define o componente funcional LoginForm
function LoginForm() {
  // Estados para controlar os campos de login e senha
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

   // Obtém a função navigate
  const navigate = useNavigate();

  // Função assíncrona para lidar com o login do usuário
  async function handleLogin(e) {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    try {
      // Chama a API para fazer login com as credenciais fornecidas
      const response = await api.post('/user', { login, senha });
      console.log('Resposta da API:', response.data);

      const user = response.data;

      // Atualiza os estados com os dados do usuário e o estado de login
      setIsLoggedIn(true);

      // Imprime informações para depuração
      console.log('Login:', login);
      console.log('Senha:', senha);
      console.log('Nome do usuário:', user.nm_solicitante);

      if (user) {
        // Usa navigate para redirecionar o usuário para a página principal após o login bem-sucedido
        navigate('/main');
      }
    } catch (error) {
      // Trata erros de login, define o estado de login como falso e exibe uma mensagem de alerta
      setIsLoggedIn(false);
      alert("Login ou senha incorretos");
      console.error('Erro ao realizar login:', error);
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLogin('');
    setSenha('');
  };

  // Retorna a estrutura do componente JSX
  return (
    <div className="App">
      {/* Renderiza o componente de cabeçalho */}
      <Header />

      {/* Renderiza a seção de formulário */}
      <div className="formulario">
        <div className="formulario-login container">
          <h3 className="formulario-login__titulo">Iniciar Sessão</h3>

          {/* Renderiza o formulário com a função handleLogin sendo chamada no evento onSubmit */}
          <form className="formulario-login_form" onSubmit={handleLogin}>

            {/* Renderiza o campo de login */}
            <div className="formulario-login__input-container">
              <input
                name="login"
                id="login"
                className="input inputs"
                type="text"
                placeholder="Login"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label className="input-label" htmlFor="login">
                Escreva seu login
              </label>
              <span className="input-message-error">Este campo não é válido</span>
            </div>

            {/* Renderiza o campo de senha */}
            <div className="formulario-login__input-container">
              <input
                name="senha"
                id="senha"
                className="input inputs"
                type="password"
                placeholder="Senha"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <label className="input-label" htmlFor="senha">
                Escreva sua senha
              </label>
              <span className="input-message-error">Este campo não é válido</span>
            </div>

            {/* Renderiza o botão de enviar */}
            <input
              className="boton-formulario-login"
              type="submit"
              name="enviar"
              id="enviar-login"
              value="Entrar"
            />
          </form>
        </div>
      </div>

      {/* Renderiza o componente de rodapé */}
      <Footer />
    </div>
  );
}

// Exporta o componente LoginForm para ser utilizado em outras partes do código
export default LoginForm;
