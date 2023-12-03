// Importa o módulo de conexão com o banco de dados
const connection = require("../database/db.js");

// Classe que contém métodos relacionados a serviços de usuário
class UserServices {

  // Método para realizar o login de um usuário
  login = (login, senha) => {
    return new Promise((resolve, reject) => {
      // Consulta o banco de dados para verificar se existe um usuário com as credenciais fornecidas
      connection.query('SELECT * FROM Usuario WHERE cd_matricula_usuario = ? AND cd_senha_usuario = ?;', [login, senha], (err, results) => {
        if (results.length === 0) {
          // Se não houver resultados, o usuário não foi encontrado e a promessa é rejeitada
          console.error('Usuário não encontrado:', err);
          reject(err);
        } else {
          // Se houver resultados, o usuário foi encontrado e a promessa é resolvida com os resultados
          console.log('Usuário logado com sucesso:', results);
          resolve(results);
        }
      });
    });
  }

  // Método para atualizar a senha de um usuário
  updateSenha = (cd_matricula_usuario, cd_senha_usuario) => {
    return new Promise((resolve, reject) => {
      // Atualiza a senha do usuário no banco de dados
      connection.query('UPDATE Usuario SET cd_senha_usuario = ? WHERE cd_matricula_usuario = ?;', [cd_senha_usuario, cd_matricula_usuario], (err, results) => {
        if (err) {
          // Se houver um erro ao atualizar a senha, a promessa é rejeitada
          console.error('Erro ao atualizar a senha:', err);
          reject(err);
        } else {
          // Se a senha for atualizada com sucesso, a promessa é resolvida com os resultados
          console.log('Senha atualizada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }
}

// Exporta a classe UserServices para ser utilizada em outros módulos
module.exports = UserServices;
