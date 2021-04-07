import express from 'express';
import Utils from './Utils';

const routes = express.Router();
routes.use(express.json());

const isNullOrUndefined = (val) => val === null || val === undefined || val === '';

routes.get('/repos', async (req, res) => {
  const { userName } = req.query;
  // GITHUB API call to get all the users Repo.

  // If the username is invalid or empty then respond accordingly.
  if (isNullOrUndefined(userName)) {
    res.send({
      listOfRepos: [],
      success: false,
      errMsg: 'Please enter valid username',
    });
    return;
  }
  // Get the expected list of Repos for a github handle.
  const responseObj = await Utils.getReposForUser(userName);
  if (!responseObj.success) {
    res.send({
      listOfRepos: [],
      success: false,
      errMsg: 'Error in the API or API rate limit exceeded ',
    });
    return;
  }
  res.send(responseObj);
});

export default routes;
