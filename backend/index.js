const express = require('express');
    // Importa o express, que é uma biblioteca para criar aplicativos web em Node.js.
const connection =  require("./src/database/db.js");
    // Importa o connection de db.js para conectar ao MongoDB.
const routes = require("./src/routes/routes.js");
    // Importa o authRoute do arquivo auth.route.js para definir rotas de autenticação.
const dotenv = require ("dotenv");
    // Importa o'dotenv' para carregar variáveis de ambiente a partir de um arquivo chamado '.env'.


var cors = require('cors');
dotenv.config(); // Configura as variáveis de ambiente a partir do arquivo '.env'.
const app = express();// Cria uma instância do aplicativo Express.
    

connection.connect(); // Conecta ao banco de dados.

const port = process.env.PORT || 3001;
    // Define uma porta para o servidor, usando a variável de ambiente 'PORT' se estiver definida, caso contrário, usa a porta 3000.

connection.connect();
    // Conecta ao banco de dados.
app.use(cors());

app.use(express.json()); // Define que a aplicação Express irá lidar com solicitações e respostas em formato JSON.

app.use(routes); // Associa as rotas definidas no arquivo 'auth.route.js' à aplicação Express, prefixando-as com "/auth".
   
