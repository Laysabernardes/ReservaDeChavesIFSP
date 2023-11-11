import Header from './pages/header.js'; // Ajuste o caminho conforme necessário
import './css/App.css';

function App() {
  return (
<div>
<Header/> {/*comando para importar o header*/}
<main>
  {/* <div className="containerSemNome">
  <h2 className="containerH2">Todas as Chaves:</h2>
  <button className="editar">Editar</button>
  </div> */}
  
  {/*CONTAINER DAS SALAS*/}
    <section id="Salas">
      <div className="tituloContainer">
        <h2>Salas de Aula:</h2>
        <a href="#">Ver tudo</a>
      </div>
      <article className="chavesContainer">
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Sala 1</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Sala 1</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Sala 1</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Sala 1</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="indisponivel"></div>
          <p>Sala 1</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Sala 1</p>
          <span>Reservar</span>
        </div>
      </article>
    </section>
    {/*CONTAINER 2*/}
    <section id="Laboratorios">
      <div className="tituloContainer">
        <h2>Laboratórios:</h2>
        <a href="#">Ver tudo</a>
      </div>
      <article className="chavesContainer">
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Laboratório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="indisponivel"></div>
          <p>Laboratório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Laboratório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Laboratório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Laboratório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Laboratório</p>
          <span>Reservar</span>
        </div>
      </article>
    </section>
    {/*CONTAINER 3*/}
    <section id="Diversos">
    <div className="tituloContainer">
        <h2>Diversos:</h2>
        <a href="#">Ver tudo</a>
      </div>
      <article className="chavesContainer">
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Auditório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Auditório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Auditório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Auditório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="disponivel"></div>
          <p>Auditório</p>
          <span>Reservar</span>
        </div>
        <div className="Carta">
          <div className="indisponivel"></div>
          <p>Auditório</p>
          <span>Reservar</span>
        </div>
      </article>
    </section>  
</main>
</div>
  );
}

export default App;
