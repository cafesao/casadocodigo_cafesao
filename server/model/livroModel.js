//Importando as Dependecias
const { Schema, model } = require('mongoose')

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
  dataLancamento: {
    type: Number,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  sinopse: {
    type: String,
    required: false,
    default: 'Não contém',
  },
})

//Exportando modelo
module.exports = model('Livro', LivroSchema)
