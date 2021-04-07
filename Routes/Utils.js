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
            message: 'Error in the API or API rate limit exceeded ',
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
}
export default Utils;
