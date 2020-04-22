//Dependencias
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Importando Rotas
const routes = require('./routes/routes')

//Setando o Express =>> server
const server = express()

//Conexão MongoDB
mongoose.connect('mongodb://localhost:27017/api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//Middleware
server.use(cors())
server.use(express.json())
server.use('/api', routes)

//Iniciado Servidor
server.listen(3001, 'localhost', () =>
  console.log('Server iniciado na porta 3001'),
)
