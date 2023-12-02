const connection = require("../database/db.js");

class UserServices {

  login = (login, senha) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Solicitante WHERE cd_matricula_solicitante = ? AND cd_senha_solicitante = ?;', [login, senha], (err, results) => {
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

  updateSenha = (cd_matricula_solicitante, cd_senha_solicitante) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Solicitante SET cd_senha_solicitante = ? WHERE cd_matricula_solicitante = ?;', [cd_senha_solicitante, cd_matricula_solicitante], (err, results) => {
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