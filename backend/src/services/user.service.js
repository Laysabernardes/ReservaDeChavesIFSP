const connection = require("../database/db.js");

class UserServices {

  login = (login, senha) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Usuario WHERE cd_matricula_usuario = ? AND cd_senha_usuario = ?;', [login, senha], (err, results) => {
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

  updateSenha = (cd_matricula_usuario, cd_senha_usuario) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Usuario SET cd_senha_usuario = ? WHERE cd_matricula_usuario = ?;', [cd_senha_usuario, cd_matricula_usuario], (err, results) => {
        if (err) {
          console.error('Erro ao atualizar a senha:', err);
          reject(err);
        } else {
          console.log('Senha atualizada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }
}

module.exports = UserServices;