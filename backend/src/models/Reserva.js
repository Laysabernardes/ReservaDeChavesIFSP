// Importar o mongoose, um módulo que permite trabalhar com MongoDB
const mongoose = require('mongoose');

// Definir o esquema da reserva, que contém as informações necessárias para cada reserva
const reservaSchema = new mongoose.Schema({
  // O professor ou cliente que fez a reserva, que deve ser uma string com o seu nome
  professor: {
    type: String,
    required: true
  },
  // A data da reserva, que deve ser uma data válida
  data: {
    type: Date,
    required: true
  },
  // A sala reservada, que deve ser uma referência a um documento da coleção salas
  sala: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Local',
    required: true
  },
  // O período da reserva, que deve ser uma string com um dos valores: 'manhã', 'tarde' ou 'noite'
  periodo: {
    type: String,
    enum: ['manhã', 'tarde', 'noite'],
    required: true
  },
  
  
  // o motivo do porquê da reserva na sala, que deve ser uma string com a sua descrição
  motivo: {
    type: String,
    required: false
  }
});

// Exportar o modelo Reserva, que será usado para criar e manipular documentos da coleção reservas
module.exports = mongoose.model('Reserva', reservaSchema);
