import Users from '../Model/Users';

export default class DataBaseService {
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
