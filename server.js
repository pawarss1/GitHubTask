import express from 'express';
import dotenv from 'dotenv';
import RouteController from './Routes/RouteController';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', RouteController);

app.listen(process.env.PORT, () => {
  console.log('app is listening on port 3000');
});
