const User = require ("../models/User.js");
    // Importa o modelo "User" definido no arquivo "../models/User.js".

    // A função "loginService" verifica se há um usuário no banco de dados com um determinado prontuario.
    // Ela recebe o prontuario como parâmetro.
const loginService = (prontuario) => {
    // Usa o método "findOne" do Mongoose para buscar um documento na coleção "User" onde o campo "prontuario" seja igual ao prontuario passado como parâmetro.
    return User.findOne({ prontuario: prontuario })
        
    .select("+password +categoria");
    // O método ".select("+password") é usado para incluir o campo "password" na resposta.
};

module.exports= { loginService };
    // Exporta a função "loginService" para que ela possa ser usada em outros módulos.