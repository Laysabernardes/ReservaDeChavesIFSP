class CardsFunctions{
  //Criando o card do local
  MostrarLocal = (nome, categoria, situacao, id) => {
    //Creando el div que guarda todo el card
    const cardLocal = document.createElement("div");
    cardLocal.className = "local__card";
    const conteudo = `
      <div class="local__card__imagem" style="background-Image: url('https://img.freepik.com/fotos-premium/fundo-de-design-verde-gradiente-ilustracao-de-cenario-colorido-vazio-com-espaco-de-copia_7954-36853.jpg')"></div>
      <h3 class="local__card__titulo">${nome}</h3>
      <p class="local__card__situacao">${situacao}</p>
      <a class="local__card__botao" href=".../${id}">Reservar ${categoria}</a>
    `
    cardLocal.innerHTML = conteudo;
    return cardLocal;
  }
  
  MostrarTodosLocais = () => {
    //Recorrer los datos traidos del JSON
    clientServices.listaProductos().then(data => {
      const productosAdmin = document.querySelector("[data-productos-admin]");
      
      data.forEach(({nome, categoria, situacao, id}) => {
        //Imprimir datos en el index
        const novoProducto = this.MostrarLocal(nome, categoria, situacao, id);
        productosAdmin.appendChild(novoProducto);
      });
    }).catch(error => alert("ocurrio un error"));
  }
}

module.exports = CardsFunctions;