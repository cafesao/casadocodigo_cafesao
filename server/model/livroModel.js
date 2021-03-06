//Importando as Dependecias
const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//Criando um Schema
const LivroSchema = new Schema({
  //Setando propriedades
  nome: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  anoLancamento: {
    type: Number,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
})

//Exportando modelo
module.exports = model('Livro', LivroSchema)
