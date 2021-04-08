import mongoose from 'mongoose';
import userSchema from './schema';

const mongoURI = 'mongodb://localhost:27017" + "/GithubTask';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Successfull connection.
    console.log('connection established with mongodb server online');
  })
  .catch((err) => {
    console.log('error while connection', err);
  });

const Users = mongoose.model('Users', userSchema);

export default Users;
