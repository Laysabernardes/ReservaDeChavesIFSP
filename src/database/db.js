// Importa a biblioteca mysql2 para interagir com o banco de dados MYSQL
const mysql = require("mysql2");

// Configurações para a conexão com o banco de dados MYSQL
const connection = mysql.createConnection({
  host: "db4free.net",       // Endereço do servidor do banco de dados
  port: 3306,                // Porta padrão para conexões MYSQL
  database: "reservaifsp",   // Nome do banco de dados que será utilizado
  user: "admreservaifsp",    // Nome de usuário para autenticação no banco de dados
  password: "reserva123",    // Senha para autenticação no banco de dados
});

// Tenta realizar a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    // Se ocorrer um erro durante a conexão, imprime uma mensagem de falha
    console.error("Falha ao conectar com o banco de dados:", err);
    return;
  }
  // Se a conexão for bem-sucedida, imprime uma mensagem de sucesso
  console.log("Conexão com o banco de dados bem sucedida!");
});

// Exporta a conexão para que possa ser utilizada em outros módulos ou partes do código
module.exports = connection;
