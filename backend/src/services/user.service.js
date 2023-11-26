const connection =  require("../database/db.js");

class UserServices{

    login = (login, senha) => {
       return new Promise((resolve, reject) => {
           connection.query('SELECT * FROM Solicitante WHERE cd_matricula_solicitante = ? AND cd_senha_solicitante = ?;',  [login, senha], (err, results) => {
               if (results.length === 0) {
                   console.error('Usuário não encontrado:', err);
                   reject(err);
               } else {
                   console.log('Usuário logado com sucesso:', results);
                   resolve(results);
               }
           });
       });
    }
}

module.exports = UserServices;