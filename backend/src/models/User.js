//Models é oque realmente faz se conectar com o BD
const mongoose = require ('mongoose'); 
    // Importa o módulo "mongoose", que é usado para definir esquemas (schemas) e interagir com o MongoDB.

const UserSchema = new mongoose.Schema({
    // Define o esquema (schema), ou seja a estrutura dos documentos de usuário, para um usuário com os seguintes campos.
    name:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    prontuario: {
        type: String,
        required: true,
        unique: true , // Garante que cada endereço de prntuario seja único.
        lowercase:true, // Armazena o prontuario em letras minúsculas.
    },
    password: {
        type: String,
        required: true,
        select:false, // Evita que a senha seja selecionada por padrão em consultas.
    },
    categoria: {
        type: String,
        enum: ['aluno', 'professor', 'adm'],
        required: true,
    },
});
const User = mongoose.model("User", UserSchema);
    // Define o modelo "User" baseado no esquema "UserSchema".
    //A linha cria uma "caixa" chamada User que define como os dados dos usuários são armazenados e recuperados no banco de dados.
module.exports = User;
    // Exporta o modelo "User" para que ele possa ser usado em outras partes do aplicativo.