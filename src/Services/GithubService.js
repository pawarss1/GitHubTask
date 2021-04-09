import axios from 'axios';
import authToken from '../../token';

export default class GithubService {
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
          const list = await axios.get(
            `${query}per_page=${pageSize}&page=${pageNum}`,
            { headers: { Authorization: `${authToken}` } },
          );
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

  static async getUserInfoFromAPI(userName) {
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
