const connection =  require("../database/db.js");

class ReservaServices{
  
  create = (cd_solicitante, cd_cargo, cd_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status, ds_tempo_entrega) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO Reserva (cd_solicitante, cd_cargo, cd_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status, ds_tempo_entrega) VALUES (?, ?, ?, ?, ? , ? ,? , ?)",  [cd_solicitante, cd_cargo, cd_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status, ds_tempo_entrega], (err, results) => {
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

  find = (id_reserva) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reserva WHERE id_reserva = ?;',  id_reserva, (err, results) => {
        if (results.length === 0) {
          console.error('Reserva não encontrada:', err);
          reject(err);
        } else {
          console.log('Reserva encontrada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }

  findAll = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reserva;', (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Todas as Reserva encontradas:', results);
          resolve(results);
        }
      });
    });
  }

  update = (id_reserva, ds_status) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Reserva SET ds_status = ? WHERE id_reserva = ?;', [ds_status, id_reserva], (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Reserva Status Update:', results);
          resolve(results);
        }
      });
    });
  }

  delete = (id_reserva) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Reserva WHERE id_reserva = ?;', id_reserva, (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else {
          console.log('Reserva Deletada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }
}

module.exports = ReservaServices;