import UserServiceMethods from '../Services/UserService/UserServiceMethods';
import DataBaseService from '../Services/DatabaseServices/DataBaseService';

export default class UserRouteController {
  static async handleUserRepoRoute(req, res) {
    try {
      // GITHUB API call to get all the users Repo.
      const responseObj = await UserServiceMethods.getReposForUser(req.query.name);
      if (!responseObj.success) {
        // UserName is invalid or API rate limit exceeded
        res.send({
          listOfRepos: [],
          success: false,
          errMsg: responseObj.message,
        });
        return;
      }
      const listOfFilteredList = UserServiceMethods.getFilteredData(
        responseObj.listOfRepos,
      );
      res.send({
        listOfRepos: listOfFilteredList,
        success: true,
        errMsg: '',
      });
    } catch (err) {
      res.send({
        listOfRepos: [],
        success: false,
        errMsg: 'Internal Server Error',
      });
    }
  }

  static async handleUserInfoRoute(req, res) {
    try {
      const dbServiceResponse = await DataBaseService.checkUserNameInDB(
        req.query.name,
      );
      // If there is some error in the DB service, respond accordingly.
      if (!dbServiceResponse.success) {
        res.status(500).send({
          userDetails: {},
          success: false,
          errMsg: dbServiceResponse.errMsg,
        });
        return;
      }
      if (dbServiceResponse.userDetails.length === 0) {
        // This entry is not cached, therefore make a Github API Call and add it to the Collection.
        const userServiceResponse = await UserServiceMethods.getUserInfo(
          req.query.name,
        );
        if (!userServiceResponse.success) {
          // The username provided is invalid in context of Github or API rate limit exceeded.
          res.send({
            userDetails: {},
            success: false,
            errMsg: 'Invalid UserName or API rate limit exceeded',
          });
          return;
        }
        // Store the valid user to the DB
        const DatabaseServiceResponse = await DataBaseService.saveUserNameInDB(
          userServiceResponse.userInfo,
        );
        if (!DatabaseServiceResponse.success) {
          // If there is problem while saving
          res.status(500).send({
            userDetails: {},
            success: false,
            errMsg: 'Error in the Database service, while saving!',
          });
        }
        res.status(200).send({
          userDetails: DatabaseServiceResponse.userInfo,
          success: true,
          errMsg: '',
        });
        return;
      }
      // If the control is here, that means the username is cached. Hence return the cached data.
      res.status(200).send({
        userDetails: dbServiceResponse.userDetails[0],
        success: true,
        errMsg: '',
      });
    } catch (err) {
      res.status(500).send({
        userDetails: {},
        success: false,
        errMsg: 'Error in the Database service',
      });
    }
  }
}
