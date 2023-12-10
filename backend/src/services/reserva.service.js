const connection = require("../database/db.js");

class ReservaServices {

  create = (cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO Reservas (cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status) VALUES (?, ?, ?, ?, ?, ? ,? )", [cd_matricula_solicitante, cd_cargo, id_permissao_estudante, cd_chave, dt_reserva, dt_devolucao, ds_status], (err, results) => {
        if (err) {
          console.error('Deu algum erro:', err);
          reject(err);
        } else  
        {
          const insertId = results && results.insertId;
        if (insertId) {
            console.log('Reserva criada com sucesso. ID:', insertId);
            resolve(results);
        } else {
            console.error('A propriedade insertId não foi encontrada na resposta:', results);
            reject(new Error('A propriedade insertId não foi encontrada na resposta.'));
        }
      }
      });
    });
  }

  find = (id_reserva) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Reservas WHERE id_reserva = ?;', id_reserva, (err, results) => {
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
      connection.query('SELECT * FROM Reservas;', (err, results) => {
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
      connection.query('UPDATE Reservas SET ds_status = ? WHERE id_reserva = ?;', [ds_status, id_reserva], (err, results) => {
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
      connection.query('DELETE FROM Reservas WHERE id_reserva = ?;', id_reserva, (err, results) => {
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

  // adicionarDetalhesReserva = (id_reserva, horario_reservado, dt_reserva) => {
  //   return new Promise((resolve, reject) => {

  //     connection.query("INSERT INTO detalhes_reserva (id_reserva, horario_reservado, dt_reserva) VALUES (?, ?, ? )", [id_reserva, horario_reservado, dt_reserva], (err, results) => {
  //       if (err) {
  //         console.error('Erro ao adicionar detalhes da reserva:', err);
  //         reject(err);
  //       } else {
  //         console.log('Detalhes da reserva adicionados com sucesso:', results);
  //         resolve(results);
  //       }
  //     });
  //   });
  // };

  adicionarDetalhesReserva = (id_reserva, horarios_reservados, dt_reserva) => {
    return new Promise((resolve, reject) => {
      const horariosReservadosArray = JSON.parse(horarios_reservados);

      // Certifique-se de que horarios_reservados é um array
      if (!Array.isArray(horariosReservadosArray)) {
        reject(new Error('O parâmetro horarios_reservados deve ser um array.'));
        return;
      }
  
      // Mapeie cada horário para um array de valores
      const values = horariosReservadosArray.map((horario) => [id_reserva, horario, dt_reserva]);
  
      // Use INSERT INTO ... VALUES (?, ?, ?), (?, ?, ?), ... para inserir múltiplos registros
      const query = "INSERT INTO detalhes_reserva (id_reserva, horario_reservado, dt_reserva) VALUES ?";
  
      connection.query(query, [values], (err, results) => {
        if (err) {
          console.error('Erro ao adicionar detalhes da reserva:', err);
          reject(err);
        } else {
          console.log('Detalhes da reserva adicionados com sucesso:', results);
          resolve(results);
        }
      });
    });
  };
  

  findByDataReserva = (dt_reserva) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM detalhes_reserva WHERE dt_reserva = ?;', [dt_reserva], (err, results) => {
        if (err) {
          console.error('Erro ao buscar detalhes da reserva por data:', err);
          reject(err);
        } else {
          console.log('Detalhes da reserva encontrados com sucesso:', results);
          resolve(results);
        }
      });
    });
  }

}

module.exports = ReservaServices;