import axios from 'axios';
import authToken from '../token';

class Utils {
  static async getDataFromAPI(query, queryType) {
    /* Reusable function that fetches 100 records in a single call according to the input query.
       Logic is to call the githubAPI and get all the required records, with upto 100 in a call.
    */
    try {
      const pageSize = 100;
      let pageNum = 1;
      let hasMorePages = true;
      let listOfData = [];
      while (hasMorePages) {
        // The github api returns at most 100 records at a time
        try {
          // eslint-disable-next-line no-await-in-loop
          const list = await axios.get(`${query}per_page=${pageSize}&page=${pageNum}`, { headers: { Authorization: `${authToken}` } });
          /* If the query type is RepoSearch, the expected data is stored in list.data.items
             whereas if the querytype is userSearch, the expected data is stored in list.data
          */
          const curList = queryType === 'userData' ? list.data : list.data.items;
          // Merging the array with existing list that holds the data from previous pages.
          listOfData = [].concat(listOfData, curList);
          if (!curList.length) {
            // All the records have been retrieved.
            hasMorePages = false;
            break;
          }
          pageNum += 1;
        } catch (err) {
          return {
            listOfData: [],
            success: false,
          };
        }
      }
      return { listOfData, success: true };
    } catch (error) {
      return {
        listOfData: [],
        success: false,
      };
    }
  }

  static async getReposForUser(user) {
    try {
      const responseObj = await this.getDataFromAPI(`https://api.github.com/users/${user}/repos?`, 'userData');
      if (!responseObj.success) {
        return {
          listOfRepos: [],
          success: false,
          message: 'User Invalid or API rate limit exceeded',
        };
      }
      return { listOfRepos: responseObj.listOfData, success: true, message: '' };
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
      const responseObj = await this.getDataFromAPI(`https://api.github.com/search/repositories?q=${repoName}&`, 'repoData');
      if (!responseObj.success) {
        return {
          listOfRepos: [],
          success: false,
          message: 'No valid repository Found or API rate limit exceeded',
        };
      }
      return { listOfRepos: responseObj.listOfData, success: true, message: '' };
    } catch (error) {
      return {
        listOfRepos: [],
        success: false,
        message: 'Internal Server Error',
      };
    }
  }
}
export default Utils;
