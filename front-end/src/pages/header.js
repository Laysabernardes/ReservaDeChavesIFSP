// Importa as funcionalidades necessárias do React
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Importa estilos do arquivo "munu.css" e a imagem do logo do Instituto Federal
import "../css/header.css";
import { logoIF } from '../img/index.js';

// Define o componente Navbar
function Navbar({ locais }) {
    // Define os estados 'active' e 'icon' usando o hook useState do React
    const [active, setActive] = useState("nav__menu");
    const [icon, setIcon] = useState("nav__toggler");
    const location = useLocation();
    const paginaEspecifica = "/";
    // Obtém dados do usuário do armazenamento local (localStorage)
    const userData = JSON.parse(localStorage.getItem('userData'));

    

    // Função para alternar entre os estados 'active' e 'icon' ao clicar no ícone do menu
    const navToggle = () => {
        // Altera a classe 'active' com base no estado atual
        if (active === "nav__menu") {
            setActive("nav__menu nav__active");
        } else {
            setActive("nav__menu");
        }

        // Altera a classe 'icon' com base no estado atual
        if (icon === "nav__toggler") {
            setIcon("nav__toggler toggle");
        } else {
            setIcon("nav__toggler");
        }

    };

      const navigate = useNavigate();
        const handleLogout = () => {
            localStorage.clear();
            navigate('/');
        }

    // Renderiza o componente Navbar
    return (
        <nav className="nav">
            {/* Contêiner do cabeçalho contendo a logo e o título */}
            <div className="header__container">
                <a href="https://cbt.ifsp.edu.br/">
                    {/* Logo do Instituto Federal de São Paulo */}
                    <img className="header__logo" src={logoIF} alt="logo do Instituto Federal de São Paulo" />
                </a>
                <p className="header__titulo">Reserva de Locais</p>
            </div>

            {/* Lista de itens de navegação (Home, Reserve, Chaves, Sair) */}
            {location.pathname !== paginaEspecifica &&

            <ul className={active}>
                <li className="nav__item primeiro">
                    <a href="/main" className="nav__link" onClick={(e) => {
                        e.preventDefault();
                        window.location.replace("/main");
                    }}>
                        Home
                    </a>
                </li>
                <li className="nav__item">
                    <a href="/perfil" className="nav__link" onClick={(e) => {
                        e.preventDefault();
                        window.location.replace("/perfil");
                    }}>
                        Perfil
                    </a>
                </li>
                <li className="nav__item">
                    <a href="/mostraChave" className="nav__link" onClick={(e) => {
                        e.preventDefault();
                        window.location.replace("/mostraChave");
                    }}>
                        Chaves
                    </a>
                </li>
                <li className="nav__item header__boton">
                    <a href="/" className="nav__link" onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}>
                        Sair
                    </a>
                </li>
            </ul>

                }

            {/* Ícone do menu (hamburguer) para telas menores */}
            <div onClick={navToggle} className={icon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}

// Exporta o componente Navbar para ser utilizado em outros lugares do projeto
export default Navbar;
