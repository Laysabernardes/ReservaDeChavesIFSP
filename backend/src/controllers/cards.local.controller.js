class CardsFunctions{
  
  find = async (req, res) => {
    try {//constante que verifica todos os campos
        const { ds_chave} = req.params;

        if (!ds_chave) {
            res.status(400).send({ message: "Adicione o valores validos!" });
        }

        //await é usado junto com async
        let categoria = await services.find(cd_chave);

        res.status(201).send({
            message: "Categoria:",
            categoria: categoria
        });
    } catch (err) {
        res.status(500).send({ message: err });
    }
}

  //Criando o card do local
  MostrarLocal = (nm_chave, ds_chave, ds_status, cd_chave) => {
    
    const cardLocal = document.createElement("div");
    cardLocal.className = "local__card";
    const conteudo = `
      <div className="local__card__imagem" style="background-Image: url('https://img.freepik.com/fotos-premium/fundo-de-design-verde-gradiente-ilustracao-de-cenario-colorido-vazio-com-espaco-de-copia_7954-36853.jpg')"></div>
      <h3 className="local__card__titulo">${nm_chave}</h3>
      <p className="local__card__status">${ds_status}</p>
      <a className="local__card__botao" href=".../${cd_chave}">Reservar ${ds_chave}</a>
    `
    cardLocal.innerHTML = conteudo;
    return cardLocal;
  }
  
  MostrarTodosLocais = () => {
    //Recorrer los datos traidos del JSON
    clientServices.listaProductos().then(data => {
      const productosAdmin = document.querySelector("[data-productos-admin]");
      
      data.forEach(({nm_chave, ds_chave, ds_status, cd_chave}) => {
        //Imprimir datos en el index
        const novoProducto = this.MostrarLocal(nm_chave, ds_chave, ds_status, cd_chave);
        productosAdmin.appendChild(novoProducto);
      });
    }).catch(error => alert(error));
  }
}

module.exports = CardsFunctions;