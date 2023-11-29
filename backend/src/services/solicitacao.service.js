const connection =  require("../database/db.js");

class SolicitacaoServices{
  
    create = (cd_funcionario, cd_estudante, cd_chave, ds_status) => {
        return new Promise((resolve, reject) => {
            // Verificar se cd_funcionario e cd_estudante existem nas tabelas Solicitante
            const verificaExistenciaQuery = "SELECT COUNT(*) AS count FROM Solicitante WHERE cd_solicitante IN (?, ?)";
            connection.query(verificaExistenciaQuery, [cd_funcionario, cd_estudante], (verificaErr, verificaResults) => {
                if (verificaErr) {
                    console.error('Erro na verificação:', verificaErr);
                    reject(verificaErr);
                } else {
                    // Verificar se o código do funcionário foi encontrado
                    const funcionarioExiste = verificaResults[0] && verificaResults[0].count > 0;
                    // Verificar se o código do estudante foi encontrado
                    const estudanteExiste = verificaResults[1] && verificaResults[1].count > 0;
    
                    if (funcionarioExiste || estudanteExiste) {
                        // Pelo menos um dos códigos foi encontrado, então prosseguir com a inserção
                        connection.query("INSERT INTO PermissaoEstudante (cd_funcionario, cd_estudante, cd_chave, ds_status) VALUES (?, ?, ?, ?)", [cd_funcionario, cd_estudante, cd_chave, ds_status], (err, results) => {
                            if (err) {
                                console.error('Erro na Solicitação:', err);
                                reject(err);
                            } else {
                                console.log('Solicitação criada com sucesso:', results);
                                resolve(results);
                            }
                        });
                    } else {
                        // Nenhum dos códigos foi encontrado na tabela Solicitante, resolver a promessa
                        console.warn('Aviso: cd_funcionario e cd_estudante não encontrado na tabela Solicitante');
                        resolve('Funcionário ou Estudante não encontrado');
                    }
                }
            });
        });
    };
    
    
    

  find = (id_permissao) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM PermissaoEstudante WHERE id_permissao = ?;',  id_permissao, (err, results) => {
        if (results.length === 0) {
          console.error('Solicitação não encontrada:', err);
          reject(err);
        } else {
          console.log('Solicitação encontrada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }

  findAll = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM PermissaoEstudante;', (err, results) => {
        if (err) {
          console.error('Deu algum erro na Solicitação:', err);
          reject(err);
        } else {
          console.log('Todas as Solicitações encontradas:', results);
          resolve(results);
        }
      });
    });
  }

  update = (id_permissao, ds_status) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE PermissaoEstudante SET ds_status = ? WHERE id_permissao = ?;', [ds_status, id_permissao], (err, results) => {
        if (err) {
          console.error('Deu algum erro  no Update da Solicitação:', err);
          reject(err);
        } else {
          console.log('Solicitação Status Update:', results);
          resolve(results);
        }
      });
    });
  }

  delete = (id_permissao) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM PermissaoEstudante WHERE id_permissao = ?;', id_permissao, (err, results) => {
        if (err) {
          console.error('Deu algum erro no delete da permissao:', err);
          reject(err);
        } else {
          console.log('Permissão Deletada com sucesso:', results);
          resolve(results);
        }
      });
    });
  }
}

module.exports = SolicitacaoServices;