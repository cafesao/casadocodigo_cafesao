//Dependencias
const express = require('express')

//Setando o Express.Router =>> routes
const routes = express.Router()

//Importando Controller
const serverController = require('../controllers/serverController')

//Setando as Rotas
//Procura
routes.get('/livros', serverController.livrosTodos)
routes.get('/livros/:nome', serverController.livroSeleto)

//Adição
routes.post('/livros', serverController.adicionarLivro)

//Modificação
routes.put('/livros/:nome', serverController.modificarLivro)

//Remoção
routes.delete('/livros/:nome', serverController.deletarLivro)

module.exports = routes
