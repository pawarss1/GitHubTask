import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());
let t = 9;

app.get('/', async (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log('app is listening on port 3000');
});
