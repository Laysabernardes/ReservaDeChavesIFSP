// Importa o componente de página principal (Main) e o estilo CSS do aplicativo
import Main from './pages/main.js'
import './css/App.css'
import React, { Component } from "react";
import Login from "./pages/login.js";

import Api from "./api.js"
const api = new Api();

// Classe do componente principal do aplicativo
class App extends Component {
  // Estado inicial do componente, determina se o componente de login deve ser exibido
  state = {
    showLogin: true,
  };

  // Método do ciclo de vida do componente, é chamado após o componente ser montado na tela
  componentDidMount() {
    // Define o estado `showLogin` para `false` após 5 segundos (simulando um processo de autenticação)
    setTimeout(() => {
      this.setState({
        showLogin: false,
      });
    }, 5000);
  }

  // Método de renderização do componente
  render() {
    return (
      <div>
        {/* Renderiza o componente de login se `showLogin` for true, caso contrário, renderiza a página principal (Main) */}
        {this.state.showLogin ? <Login /> : <Main />}
      </div>
    );
  }
}

// Exporta o componente principal do aplicativo para ser utilizado em outros lugares
export default App;
