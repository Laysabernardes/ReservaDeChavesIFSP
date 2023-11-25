const connection =  require("../database/db.js");

const find = (cd, cd_matricula, nome, cargo) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Solicitante WHERE cd_solicitante = ? AND cd_matricula_solicitante = ? AND nm_solicitante = ? AND cd_cargo = ?;',  [cd, cd_matricula, nome, cargo], (err, results) => {
            if (results.length === 0) {
                console.error('Usuário não encontrado:', err);
                reject(err);
            } else {
                console.log('Usuário encontrado com sucesso:', results);
                resolve(results);
            }
        });
    });
}
module.exports = find;