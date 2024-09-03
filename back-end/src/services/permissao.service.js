// Importa o módulo de conexão com o banco de dados
const connection = require("../database/db.js");

// Define uma classe chamada ChavesServices para lidar com operações relacionadas a permissões no banco de dados
class ChavesServices {

  // Método para criar um novo pedido de permissão
  create = (cd_matricula_funcionario, cd_matricula_estudante, cd_chave) => {
    return new Promise((resolve, reject) => {
      // Executa uma query SQL para inserir um novo pedido no banco de dados
      connection.query("INSERT INTO Permissao (cd_matricula_funcionario, cd_matricula_estudante, cd_chave, ds_status) VALUES (?, ?, ?, ?)", [cd_matricula_funcionario, cd_matricula_estudante, cd_chave, "SOLICITADO"], (err, results) => {
        if (err) {
          console.error('Erro ao criar pedido:', err);
          reject(err);
        } else {
          // console.log('Pedido enviado ao responsável:', results);
          resolve(results);
        }
      });
    });
  }

  // Método para encontrar pedidos associados a um funcionário
  findFuncionario = (cd_matricula_funcionario) => {
    return new Promise((resolve, reject) => {
      // Executa uma query SQL para selecionar pedidos associados a um funcionário
      connection.query('SELECT * FROM Permissao WHERE cd_matricula_funcionario = ?;', cd_matricula_funcionario, (err, results) => {
        if (results.length === 0) {
          console.error('Nenhum pedido feito:', err);
          reject(err);
        } else {
          // console.log('Pedidos de permissão enviados:', results);
          resolve(results);
        }
      });
    });
  }

  // Métodos semelhantes para encontrar pedidos associados a um estudante, uma permissão específica e todos os pedidos
  findEstudante = (cd_matricula_estudante) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Permissao WHERE cd_matricula_estudante = ?;', cd_matricula_estudante, (err, results) => {
        if (results.length === 0) {
          console.error('Não há pedidos em andamentou E/OU permissões:', err);
          reject(err);
        } else {
          // console.log('Pedidos E/OU Permissões:', results);
          resolve(results);
        }
      });
    });
  }

  findPermissao = (id_permissao) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Permissao WHERE id_permissao = ?;', id_permissao, (err, results) => {
        if (results.length === 0) {
          console.error('Esta permissão não existe:', err);
          reject(err);
        } else {
          // console.log('Permissão:', results);
          resolve(results);
        }
      });
    });
  }

  findAll = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Permissao;', (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          // console.log('Todas as permissões encontradas:', results);
          resolve(results);
        }
      });
    });
  }

  // Método para atualizar o status de uma permissão
  update = (id_permissao, ds_status) => {
    return new Promise((resolve, reject) => {
      // Executa uma query SQL para atualizar o status de uma permissão no banco de dados
      connection.query('UPDATE Permissao SET ds_status = ? WHERE id_permissao = ?;', [ds_status, id_permissao], (err, results) => {
        if (err) {
          console.error('Erro ao atualizar permissão:', err);
          reject(err);
        } else {
          // console.log('Permissão Status Update:', results);
          resolve(results);
        }
      });
    });
  }
}

// Exporta a classe ChavesServices para ser utilizada em outros módulos
module.exports = ChavesServices;