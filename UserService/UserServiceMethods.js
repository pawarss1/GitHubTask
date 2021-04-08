import axios from 'axios';
import authToken from './token';
import GithubServiceMethods from '../GitHubServices/GithubServiceMethods';

export default class UserServiceMethods {
  static async getReposForUser(user) {
    try {
      const responseObj = await GithubServiceMethods.getDataFromAPI(
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
    // Making a API call to get the information about the User.
    try {
      const userInfo = await axios.get(
        `https://api.github.com/users/${userName}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        },
      );
      return {
        userInfo,
        success: true,
        message: '',
      };
    } catch (err) {
      return {
        userInfo: {},
        success: false,
        message: 'UserName Invalid or API limit exceeded',
      };
    }
  }
}
