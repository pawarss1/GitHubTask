import axios from 'axios';
import authToken from '../token';

class Utils {
  static async getReposForUser(user) {
    try {
      const pageSize = 100;
      let pageNum = 1;
      let hasMorePages = true;
      let listOfRepos = [];
      while (hasMorePages) {
        // The github api returns at most 100 Repos data at a time
        try {
          // eslint-disable-next-line no-await-in-loop
          const list = await axios.get(
            `https://api.github.com/users/${user}/repos?per_page=${pageSize}&page=${pageNum}`,
            {
              headers: {
                Authorization: `${authToken}`,
              },
            },
          );
          // Merging the array with existing list that holds the users from previous pages
          listOfRepos = [].concat(listOfRepos, list.data);
          if (!list.data.length) {
            // All the repos have been retreived.
            hasMorePages = false;
            break;
          }
          pageNum += 1;
        } catch (err) {
          return {
            listOfRepos: [],
            success: false,
            message: 'Username invalid or API rate limit exceeded ',
          };
        }
      }
      return { listOfRepos, success: true, message: '' };
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

  static async getRelatedRepos(repoName) {
    try {
      // Making API call to get all the matching repos for a given search key.
    } catch (err) {
      return {
        success: false,
        listOfRepos: [],
      };
    }
  }
}
export default Utils;
