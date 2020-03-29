const express = require('express');
const ongController = require('./controllers/ongController');
const casosController = require('./controllers/casosController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const routes = express.Router();

/**criando uma nova rota pra listar ongs cadastradas*/
 routes.get('/ongs', ongController.listar);

/** Cadastro de ongs*/
routes.post('/ongs', ongController.create);

routes.post('/casos', casosController.createCaso );

routes.get('/casos', casosController.listarCasos);

routes.delete('/casos/:id', casosController.deletarCaso );

routes.get('/casos', profileController.listarEspc);

routes.post('/session', sessionController.create);

module.exports = routes ;

