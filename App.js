import logo from './logo.svg';
import './App.css';

function App() {
  return (
<div>
  <div className="cabecalho">
    <h3 className="containerH3">Reserva de Chaves</h3>
    <input type="text" id="pesquisa" placeholder="O que deseja encontrar"></input>
  </div>
  <div className="containerSemNome">
  <h2 className="containerH2">Todas as Chaves:</h2>
  <button className="editar">Editar</button>
  </div>
  
  {/*CONTAINER 1*/}
    <div className="containerChaves"> 
      <div className="disponivel">
        <>Laboratório 1</>
      </div>
      <div className="disponivel">
        <>Laboratório 2</>
      </div>
      <div className="disponivel">
        <>Laboratório 3</>
      </div>
      <div className="disponivel">
        <>Laboratório 4</>
      </div>
      <div className="indisponivel">
        <>Laboratório 4</>
      </div>
      <div className="disponivel">
        <>Laboratório 4</>
      </div>
    </div>
    {/*CONTAINER 2*/}
    <div className="containerChaves"> 
      <div className="disponivel">
        <>Laboratório 1</>
      </div>
      <div className="indisponivel">
        <>Laboratório 2</>
      </div>
      <div className="disponivel">
        <>Laboratório 3</>
      </div>
      <div className="disponivel">
        <>Laboratório 4</>
      </div>
      <div className="disponivel">
        <>Laboratório 4</>
      </div>
      <div className="disponivel">
        <>Laboratório 4</>
      </div>
    </div>
    {/*CONTAINER 3*/}
    <div className="containerChaves"> 
      <div className="disponivel">
        <>Laboratório 1</>
      </div>
      <div className="disponivel">
        <>Laboratório 2</>
      </div>
      <div className="disponivel">
        <>Laboratório 3</>
      </div>
      <div className="indisponivel">
        <>Laboratório 4</>
      </div>
      <div className="disponivel">
        <>Laboratório 4</>
      </div>
      <div className="disponivel">
        <>Laboratório 4</>
      </div>
    </div>
</div>
      
  );
}

export default App;
