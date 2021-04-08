import express from 'express';
import UserRouteController from '../Controllers/UserRouteController';
import inputValidationMiddleware from '../Middlewares/inputValidationMiddleware';

const routes = express.Router();
routes.use(express.json());
routes.use(inputValidationMiddleware);

routes.get('/userRepos', async (req, res) => UserRouteController.handleUserRepoRoute(req, res));

routes.get('/userInfo', async (req, res) => UserRouteController.handleUserInfoRoute(req, res));

export default routes;
