const express = require('express');

const OngControllerValidators = require('./validators/OngControllerValidators');
const ProfileControllerValidators = require('./validators/ProfileControllerValidators');
const IncidentControllerValidators = require('./validators/IncidentControllerValidators');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngControllerValidators.create, OngController.create);

routes.get('/profile', ProfileControllerValidators.index, ProfileController.index);

routes.post('/sessions', SessionController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id',IncidentControllerValidators.delete, IncidentController.delete);

module.exports = routes;
