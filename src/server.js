import express from 'express';
import dotenv from 'dotenv';
import UserRoutes from './Routes/UserRoutes';
import RepoRoutes from './Routes/RepoRoutes';
import dbConnector from './Services/DatabaseServices/dbConnector';

dotenv.config();

const app = express();
app.use(express.json());

// Connection to the Database.
dbConnector();

app.use('/user', UserRoutes);
app.use('/repo', RepoRoutes);

app.listen(process.env.PORT, () => {
  console.log('app is listening on port 3000');
});
