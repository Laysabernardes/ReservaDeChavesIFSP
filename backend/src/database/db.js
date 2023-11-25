// Conecta ao banco de dados MYSQL
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "db4free.net",
  port: 3306,
  database: "reservaifsp",
  user: "admreservaifsp",
  password: "reserva123",
  connectTimeout: 10000, // 10 seconds
});

// Resposta da conexão ao banco de dados 
connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    return;
  }
  console.log("Connected to database successfully!");
});

module.exports = connection;