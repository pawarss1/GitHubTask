import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017" + "/GithubTask';

export default function dbConnector() {
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
}
