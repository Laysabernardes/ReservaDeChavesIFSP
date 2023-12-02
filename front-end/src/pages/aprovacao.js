import React from "react";

import Header from "./header";
import Footer from "./footer";

import '../css/reset.css';
import '../css/index.css';
import '../css/aprovacao.css';

function AprovacaoProf(){
    return(
        <div>
            <Header/>
                <div className='formulario'>
                    <div className="formulario-login container">
                        <h3 className="formulario-login__titulo">Pedidos</h3>
                        <div className="formulario-login_form">
                            <h2 className="formulario-login__h2">Não há notificações</h2>
                            <form action="" className="formulario-cadastro__input-container">
                                <div className="formulario-cadastro__input-container">
                                <div className="formulario-cadastro__input-container input ">
                                    <label className="input-label" htmlFor="solicitacao">
                                     Nome do Solicitante aparecerá aqui
                                    </label>
                                    <div className="radio-buttons-container">
                                    
                                        <input 
                                        className="boton-form-aceitar"
                                        type="submit"
                                        id="aprovar_solicitacao"
                                        name="aprovacao_solicitante"
                                        value="Aceitar"
                                        />
                                        <input 
                                        className="boton-form-recusar"
                                        type="submit"
                                        id="recusar_solicitacao"
                                        name="recusar_solicitante"
                                        value="Recusar"
                                        />
                                        
                                    </div>
                                </div>
                                </div>
                            </form>                           
                        </div>
                    </div>
                </div>        
            <Footer/>
        </div>
    )
}

export default AprovacaoProf