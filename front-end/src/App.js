//page App.js


import Main from './pages/main.js'
import './css/App.css'
import React, { Component } from "react";
import Login from "./pages/login.js";


class App extends Component {
  state = {
    showLogin: true,
  };

  componentDidMount() {
    // Define o estado `showLogin` para `false` após 5 segundos
    setTimeout(() => {
      this.setState({
        showLogin: false,
      });
    }, 5000);
  }

  render() {
    return (
      <div>
        {this.state.showLogin ? <Login /> : <Main />}
      </div>
    );
  }
}

export default App;
