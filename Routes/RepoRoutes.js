import express from 'express';
import inputValidation from '../Middlewares/inputValidationMiddleware';
import RepoRouteController from '../Controllers/RepoRouteController';

const routes = express.Router();
routes.use(express.json());
routes.use(inputValidation);

routes.get('/relatedRepos', async (req, res) => RepoRouteController.handleRelatedRepoSearch(req, res));

export default routes;
