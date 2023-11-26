 const { loginService } = require("../services/auth.service.js");
 // Importa o serviço de autenticação "loginService".
 // Função para processar o login do usuário.
//  const login = async (req, res) => {
//      const { prontuario, password } = req.body;
//     // Extrai o email e senha da solicitação.

//     try {
//         const user = await loginService(prontuario);
//          // Pesquisa um usuário com base no prontuario fornecido.
//         if (!user) {
//              return res.status(404).send({ message: "Usuário ou senha não encontrados." });
//          }
//         // Compara a senha fornecida no login com a senha armazenada no banco de dados (em texto simples).
//          if (password !== user.password) {
//             // Se as senhas não coincidirem, retorna uma resposta de erro com status 404.
//             return res.status(404).send({ message: "Usuário ou senha não encontrados." });
//         }
//         // Verifica a categoria do usuário
//         const categoria = user.categoria;
//         // Se o login for bem-sucedido, envia uma resposta indicando que o login está ok.
//          res.status(200).send({ message: "Login bem-sucedido", categoria });
//          console.log({ message: "Login bem-sucedido", categoria });

//     } catch (err) {
//          res.status(500).send(err.message);
//     };
// };
//  module.exports = {login};//Exportando um obejto desconstruido, só a função.


// Função para processar o login do usuário.
// Função para processar o login do usuário.
// const mysql = require("mysql");
// const connection =  require("./src/database/db.js");

const login = async (cd_matricula_funcionario, cd_funcionario, res) => {
  // Conecta ao banco de dados.
  await connection.connect();

  // Cria uma consulta SQL.
  const sql = `SELECT * FROM Funcionario WHERE cd_matricula_funcionario = ? AND cd_funcionario = ?`;
  const params = [cd_matricula_funcionario, cd_funcionario];

  try {
    // Executa a consulta SQL.
    const result = await connection.query(sql, params);

    // Verifica se o resultado não está vazio.
    if (result.length > 0) {
      // Se o login foi bem-sucedido, define o código de status da resposta para 200 e envia uma mensagem de sucesso.
      res.status(200).send({ message: "Login bem-sucedido" });

      // Retorna o registro do funcionário.
      return result[0];
    } else {
      // O login falhou.
      // Define o código de status da resposta para 404.
      res.status(404).send({ message: "Usuário ou senha não encontrados." });
      return null;
    }
  } catch (err) {
    // O login falhou devido a um erro no banco de dados.
    // Define o código de status da resposta para 500.
    res.status(500).send(err.message);
    return null;
  } finally {
    // Fecha a conexão com o banco de dados.
    await connection.end();
  }
};

module.exports = {login};


