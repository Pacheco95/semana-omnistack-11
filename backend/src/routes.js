const express = require('express');

const OngControllerValidators = require('./validators/OngControllerValidators');
const ProfileControllerValidators = require('./validators/ProfileControllerValidators');
const IncidentControllerValidators = require('./validators/IncidentControllerValidators');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const AuthController = require('./controllers/AuthController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/authenticate', AuthController.authenticate);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngControllerValidators.create, OngController.create);

routes.get('/profile', authMiddleware, ProfileControllerValidators.index, ProfileController.index);

routes.get('/incidents', IncidentController.index);
// TODO validate new incident params
routes.post('/incidents', authMiddleware, IncidentController.create);
routes.delete('/incidents/:id', authMiddleware, IncidentControllerValidators.delete, IncidentController.delete);

module.exports = routes;
