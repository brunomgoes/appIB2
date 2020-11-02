const express = require('express');

const UserController = require('./controllers/UserController');
const PacientController = require('./controllers/PacientController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/users', UserController.index); //retorna todos os users
routes.post('/users', UserController.create); //cria um novo user

routes.get('/pacients', PacientController.index); //retorna os pacientes de um user especifico
routes.post('/pacients', PacientController.create); //cria um novo paciente
routes.delete('/pacients/:id', PacientController.delete); //deleta um paciente

module.exports = routes;