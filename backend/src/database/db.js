// Conecta ao banco de dados MYSQL
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "db4free.net",
  port: 3306,
  database: "reservaifsp",
  user: "admreservaifsp",
  password: "reserva123",
});

// Resposta da conexão ao banco de dados 
connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    return;
  }
  console.log("Connected to database successfully!");

  connection.query("SELECT * FROM Funcionario ", (err, results) => {
     if (err) {
      console.error("Error executing query:", err);
      return;
   }

    // Imprime os resultados da consulta no console.
    console.log("Resultados da consulta:", results);
  });
});

module.exports = connection;


//const mysql = require('mysql');
//const connection = mysql.createConnection({
// host: 'localhost',
// user: 'dbuser',
//password: 's3kreee7',
// database: 'my_db'
//});
