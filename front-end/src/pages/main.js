import React from 'react';
import '../css/main.css'; // Importa o estilo CSS para o componente main
import Header from './header';
import Banner from './banner.js';
import Footer from './footer.js'

function Main() {
    return (
        <div>
            <Header />
            <Banner />
            <section className="section__produtos">
                <div className="produtos container">
                    <div className="salas">
                        <div className="salas__head">
                            <h2 className="salas__head__titulo-principal">Salas:</h2>
                        </div>
                        <div className="produtos_index" id="data-salas"></div>
                    </div>
                    <div className="labs">
                        <div className="labs__head">
                            <h2 className="labs__head__titulo-principal">Laboratórios:</h2>
                        </div>
                        <div className="produtos_index" id="data-labs"></div>
                    </div>
                    <div className="diversos">
                        <div className="diversos__head">
                            <h2 className="diversos__head__titulo-principal">Diversos:</h2>
                        </div>
                        <div className="produtos_index" data-diversos></div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>

    );
}

export default Main;
