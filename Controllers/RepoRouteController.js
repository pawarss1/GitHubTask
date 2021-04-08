import GithubServiceMethods from '../GitHubServices/GithubServiceMethods';

export default class RepoRouteController {
  static async handleRelatedRepoSearch(req, res) {
    try {
      // Making API call to get all the matching repos for a given search key.
      const responseObj = await GithubServiceMethods.getDataFromAPI(
        `https://api.github.com/search/repositories?q=${req.query.name}&`,
        'repoData',
      );
      if (!responseObj.success) {
        // There is some internal server error or API rate limit exceeded.
        res.status(500).send({
          success: false,
          listOfRepos: [],
          errrMsg: 'Internal server error or API rate limit exceeded',
        });
        return;
      }
      // If the flow is here that means, server and the API are working properly.
      res.send({
        success: true,
        listOfRepos: responseObj,
        errrMsg: '',
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        listOfRepos: [],
        errrMsg: 'Internal server error or API rate limit exceeded',
      });
    }
  }
}
