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



// const mysql = require("mysql2");
// // Importa a função "getConnection" do arquivo "db.js".
// const connection  = require("../database/db.js");
  
// // Obtém uma conexão com o banco de dados.
// connection.connect(); 

// function loginService(cd_matricula_funcionario) {
  
//   // Cria uma consulta SQL.
//   const sql = "SELECT * FROM Funcionario WHERE cs_matricula_funcionario = ?";
//   const params = [cd_matricula_funcionario];

//   // Executa a consulta SQL.
//   connection.query(sql, params, (err, results) => {
//     if (err) {
//       console.error("Failed to login:", err);
//       return null;
//     }

//     // Se a consulta retornar um elemento, retorna o objeto do funcionário.
//     if (results.length > 0) {
//       return results[0];
//     } else {
//       // Se a consulta retornar zero elementos, retorna `null`.
//       return null;
//     }
//   });
// }
// module.exports= { loginService };