import Header from './pages/header.js'; 
import Footer from './pages/footer.js'
import './css/App.css';

function App() {
  return (
<div>
<Header/> {/*comando para importar o header*/}
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
    <Footer/>
</div>
      
  );
}

export default App;
