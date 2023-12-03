const connection =  require("../database/db.js");

class ChavesServices{
  
  create = (cd_matricula_funcionario, cd_matricula_estudante, cd_chave) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO Permissao (cd_matricula_funcionario, cd_matricula_estudante, cd_chave, ds_status) VALUES (?, ?, ?, ?)",  [cd_matricula_funcionario, cd_matricula_estudante, cd_chave, "em andamento"], (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Pedido enviado ao responsável:', results);
          resolve(results);
        }
      });
    });
  }

  findFuncionario = (cd_matricula_funcionario) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Permissao WHERE cd_matricula_funcionario = ?;',  cd_matricula_funcionario, (err, results) => {
        if (results.length === 0) {
          console.error('Nenhum pedido feito:', err);
          reject(err);
        } else {
          console.log('Pedidos de permissão enviados:', results);
          resolve(results);
        }
      });
    });
  }

  findEstudante = (cd_matricula_estudante) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Permissao WHERE cd_matricula_estudante = ?;',  cd_matricula_estudante, (err, results) => {
        if (results.length === 0) {
          console.error('Não há pedidos em andamentou E/OU permissões:', err);
          reject(err);
        } else {
          console.log('Pedidos E/OU Permissões:', results);
          resolve(results);
        }
      });
    });
  }
  
  findPermissao = (id_permissao) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Permissao WHERE id_permissao = ?;',  id_permissao, (err, results) => {
        if (results.length === 0) {
          console.error('Esta permissão não existe:', err);
          reject(err);
        } else {
          console.log('Permissão:', results);
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
          console.log('Todas as permissões encontradas:', results);
          resolve(results);
        }
      });
    });
  }

    update = (id_permissao, ds_status) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Permissao SET ds_status = ? WHERE id_permissao = ?;', [ds_status, id_permissao], (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Permissão Status Update:', results);
          resolve(results);
        }
      });
    });
  }
}

module.exports = ChavesServices;