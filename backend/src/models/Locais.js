//Models é oque realmente faz se conectar com o BD
const mongoose = require ('mongoose'); 
    // Importa o módulo "mongoose", que é usado para definir esquemas (schemas) e interagir com o MongoDB.

const localSchema = new mongoose.Schema({
    // Define o esquema (schema), ou seja a estrutura dos documentos de locais, para um usuário com os seguintes campos.
    nome:{
        type: String,
        required: true,
    },
    categoria:{
        type: String,
        enum: ['Sala', 'Laboratório', 'Diverso'],
        required: true,
    },
    status: {
        type: String,
        enum: ['LIVRE', 'OCUPADO'],
        required: true,
    },
});


const Local = mongoose.model("Local", localSchema);
    // Define o modelo "Local" baseado no esquema "localSchema".
    //A linha cria uma "caixa" chamada Local que define como os dados dos Locais são armazenados e recuperados no banco de dados.


module.exports = Local;
    // Exporta o modelo "Local" para que ele possa ser usado em outras partes do aplicativo.