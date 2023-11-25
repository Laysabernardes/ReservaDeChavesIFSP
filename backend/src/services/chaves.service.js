
//.create é um metodo do mongoose para criar um novo documento no mongoDB
const createLocal = (body) => Local.create(body);

//.find é um método de consulta do Mongoose para consultar as coleções
const findAllLocal = () => Local.find();

//findById é um método de consulta do Mongoose que é utilizado para recuperar um único documento com base no ID.
const findByIdLocal = (id) => Local.findById(id);

const locaisServices = {
  createLocal,
  findAllLocal,
  findByIdLocal
};

module.exports = locaisServices;