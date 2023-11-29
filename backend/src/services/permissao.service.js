const connection =  require("../database/db.js");

class ChavesServices{
  
  create = (cd_funcionario, cd_estudante, cd_chave) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO PermissaoEstudante (cd_funcionario, cd_estudante, cd_chave, ds_status) VALUES (?, ?, ?, ?)",  [cd_funcionario, cd_estudante, cd_chave, "em andamento"], (err, results) => {
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

  findFuncionario = (cd_funcionario) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM PermissaoEstudante WHERE cd_funcionario = ?;',  cd_funcionario, (err, results) => {
        if (results.length === 0) {
          console.error('Nenhum pedido feito para você:', err);
          reject(err);
        } else {
          console.log('Pedidos de permissão enviados para você:', results);
          resolve(results);
        }
      });
    });
  }

  findEstudante = (cd_estudante) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM PermissaoEstudante WHERE cd_estudante = ?;',  cd_estudante, (err, results) => {
        if (results.length === 0) {
          console.error('Você não possui pedidos em andamentou E/OU permissões:', err);
          reject(err);
        } else {
          console.log('Seus Pedidos E/OU Permissões:', results);
          resolve(results);
        }
      });
    });
  }
  
  findPermissao = (id_permissao) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM PermissaoEstudante WHERE id_permissao = ?;',  id_permissao, (err, results) => {
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
      connection.query('SELECT * FROM PermissaoEstudante;', (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Todas as Chaves encontradas:', results);
          resolve(results);
        }
      });
    });
  }

    update = (id_permissao, ds_status) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE PermissaoEstudante SET ds_status = ? WHERE id_permissao = ?;', [ds_status, id_permissao], (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Chave Status Update:', results);
          resolve(results);
        }
      });
    });
  }
}

module.exports = ChavesServices;