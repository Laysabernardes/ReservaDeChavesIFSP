// Importar o modelo Reserva, que foi definido no modelo em expressJS
const Reserva = require('../models/Reserva.js');

// Definir o controlador como um objeto com métodos
const reservaController = {};

// Método para criar uma nova reserva
reservaController.create = async (req, res) => {
  try {
    // Obter os dados da reserva do corpo da requisição
    const { data, sala, periodo, professor, motivo } = req.body;

    // Validar os dados da reserva, por exemplo, se a sala está disponível, se o professor existe, etc.
    // Você pode usar algum módulo de validação, como o express-validator ou o joi
    // Aqui vamos supor que os dados são válidos

    // Criar uma nova instância do modelo Reserva com os dados da requisição
    const reserva = new Reserva({
      professor,
      data,
      sala,
      periodo,
      motivo
    });

    // Salvar a reserva no banco de dados usando o método save do mongoose
    await reserva.save();

    // Enviar a reserva para uma página de aprovação, que pode ser uma rota do express ou uma API externa
    // Você pode usar algum módulo de requisição HTTP, como o axios ou o request
    // Aqui vamos supor que a página de aprovação é uma rota do express chamada /aprovar
    // Você pode usar o método redirect do objeto de resposta para redirecionar o cliente para essa rota
    // Você pode passar a reserva como um parâmetro na URL
    res.redirect(`/aprovar?reserva=${reserva._id}`);
  } catch (err) {
    // Tratar o erro, por exemplo, enviando uma mensagem de erro ao cliente
    res.status(500).send(`Ocorreu um erro ao criar a reserva: ${err.message}`);
  }
};

// Exportar o controlador para ser usado em outros módulos, como as rotas
module.exports = reservaController;