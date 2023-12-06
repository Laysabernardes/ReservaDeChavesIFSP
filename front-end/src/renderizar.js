// Função para renderizar os cartões de locais

export const renderizarLocais = (locais, navigate, userData) => {

    const coresHex = ['#81F459', '#85D139', '#68C13D', '#50C128', '#73DB4E', '#559A2A', '#24BC17', '#19A516', '#11791B', '#0F7113', '#2A7B0D', '#0D9232'];
    return locais.map((local, index) => (
        // Para cada local, cria um cartão com informações
        <div key={local.cd_chave} className="local__card">
            <div
                className="local__card__imagem"
                // Estilo da imagem de fundo (comentado para ser ajustado)
                style={{ backgroundColor: coresHex[index % coresHex.length] }}
            ></div>
            <h3 className="local__card__titulo">{local.nm_chave}</h3>
            <p className="local__card__status">{local.ds_status}</p>
            <a
                href="/reserva"
                className="local__card__botao"
                onClick={(e) => {
                    e.preventDefault(); // Evita a recarga da página
                    setTimeout(() => {
                        navigate('/reserva', { state: { chave: local, user: userData } });
                    }, 100);
                }}
            >
                Reservar {local.ds_chave}
            </a>
        </div>
    ));
};
