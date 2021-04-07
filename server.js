import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', async (req, res) => {
  console.log(process.env.PORT);
  res.send('Hello');
});

app.listen(port, () => {
  console.log('app is listening on port 3000');
});
