import GithubService from './GithubService';
import Users from '../Model/Users';

export default class UserService {
  static async getReposForUser(user) {
    try {
      const responseObj = await GithubService.getDataFromAPI(
        `https://api.github.com/users/${user}/repos?`,
        'userData',
      );
      if (!responseObj.success) {
        return {
          listOfRepos: [],
          success: false,
          message: 'User Invalid or API rate limit exceeded',
        };
      }
      return {
        listOfRepos: responseObj.listOfData,
        success: true,
        message: '',
      };
    } catch (error) {
      return {
        listOfRepos: [],
        success: false,
        message: 'Internal Server Error',
      };
    }
  }

  static getFilteredData(listOfRepos) {
    const filteredList = [];
    listOfRepos.forEach((repo) => {
      filteredList.push({
        Name: repo.name,
        OwnerName: repo.owner.login,
        Description: repo.description,
        StarCount: repo.stargazers_count,
        ProjectURL: repo.html_url,
      });
    });
    return filteredList;
  }

  static async getUserInfo(userName) {
    // Controller method for making a API call to get the information about the User.
    const userDetailResponse = await GithubService.getUserInfoFromAPI(userName);
    return userDetailResponse;
  }

  static async checkUserNameInDB(userName) {
    try {
      // Querying the DB to check for Cached entry.
      const userDetails = await Users.find({ name: userName.toLowerCase() });
      return {
        userDetails,
        success: true,
        errMsg: '',
      };
    } catch (err) {
      return {
        userInfo: {},
        errMsg: 'Database Error',
        success: false,
      };
    }
  }

  static async saveUserNameInDB(userInfo) {
    try {
      // Add the valid user to the Database.
      const newUser = new Users({
        name: userInfo.data.login.toLowerCase(),
        email: userInfo.data.email,
        gitHubLink: userInfo.data.html_url,
        company: userInfo.data.company,
        followingCount: userInfo.data.following,
        followerCount: userInfo.data.followers,
        bio: userInfo.data.bio,
        publicReposCount: userInfo.data.public_repos,
      });
      await newUser.save();
      return {
        userInfo: newUser,
        errMsg: '',
        success: true,
      };
    } catch (err) {
      return {
        userInfo: {},
        errMsg: 'Error in the Database service, Failed while saving.',
        success: false,
      };
    }
  }
}
