const connection =  require("../database/db.js");

class ChavesServices{
  
  create = (nm_chave, ds_chave, ds_status, ds_obs_chave) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO Chaves (nm_chave, ds_chave, ds_status, ds_obs_chave) VALUES (?, ?, ?, ?)",  [nm_chave, ds_chave, ds_status, ds_obs_chave], (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Chave criada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }

  find = (cd_chave) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Chaves WHERE cd_chave = ?;',  cd_chave, (err, results) => {
        if (results.length === 0) {
          console.error('Chave não encontrada:', err);
          reject(err);
        } else {
          console.log('Chave encontrada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }

  findAll = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Chaves;', (err, results) => {
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

  update = (cd_chave, ds_status) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Chaves SET ds_status = ? WHERE cd_chave = ?;', [ds_status, cd_chave], (err, results) => {
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

  delete = (cd_chave) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Chaves WHERE cd_chave = ?;', cd_chave, (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Chave Deletada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }
}

module.exports = ChavesServices;