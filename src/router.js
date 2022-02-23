import { Router } from 'express';

import { UsersController } from './controllers/UsersController.js';

// Controllers instances
const usersController = new UsersController();

// Create router
const routes = Router();

// Define users routes
routes.get('/users', usersController.getUsers);
routes.get('/users/:id', usersController.getUser);
routes.post('/users', usersController.createUser);
routes.put('/users/:id', usersController.updateUser);
routes.delete('/users/:id', usersController.deleteUser);

export { routes };