import express from 'express';
import Utils from './Utils';
import Users from '../Model/connector';

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
      errMsg: 'Please provide a username',
    });
    return;
  }
  // Get the expected list of Repos for a github handle.
  const responseObj = await Utils.getReposForUser(userName);
  if (!responseObj.success) {
    res.send({
      listOfRepos: [],
      success: false,
      errMsg: responseObj.message,
    });
    return;
  }
  const listOfFilteredList = Utils.getFilteredData(responseObj.listOfRepos);
  res.send({
    listOfRepos: listOfFilteredList,
    success: true,
    errMsg: '',
  });
});

routes.get('/userInfo', async (req, res) => {
  const { userName } = req.query;
  // Check for Empty UserName.
  if (isNullOrUndefined(userName)) {
    res.send({
      userDetails: {},
      success: false,
      errMsg: 'Please provide a username',
    });
    return;
  }
  try {
    const userDetails = await Users.find({ name: userName });
    if (userDetails.length === 0) {
      // This entry is not cached, therefore make a Github API Call and add it to the Collection.
      const userInfoFromGitHubAPI = await Utils.getUserInfo(userName);
      if (!userInfoFromGitHubAPI.success) {
        // The username provided is invalid in context of Github or API rate limit exceeded.
        res.send({
          userInfo: {},
          errMsg: userInfoFromGitHubAPI.message,
          success: false,
        });
        return;
      }
      // Add the valid user to the Database.
      const newUser = new Users({
        name: userInfoFromGitHubAPI.userInfo.data.login,
        email: userInfoFromGitHubAPI.userInfo.data.email,
        gitHubLink: userInfoFromGitHubAPI.userInfo.data.html_url,
        company: userInfoFromGitHubAPI.userInfo.data.company,
        followingCount: userInfoFromGitHubAPI.userInfo.data.following,
        followerCount: userInfoFromGitHubAPI.userInfo.data.followers,
        bio: userInfoFromGitHubAPI.userInfo.data.bio,
        publicReposCount: userInfoFromGitHubAPI.userInfo.data.public_repos,
      });
      await newUser.save();
      res.send({
        userInfo: newUser,
        errMsg: '',
        success: true,
      });
      return;
    }
    // If the control is here, that means the username is cached. Hence return the cached data.
    res.send({
      userInfo: userDetails[0],
      errMsg: '',
      success: true,
    });
  } catch (err) {
    res.send({
      userDetails: {},
      success: false,
      errMsg: 'Error in the Database service',
    });
  }
});
export default routes;
