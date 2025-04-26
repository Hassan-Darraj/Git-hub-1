import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
const pass = 'correct';

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/public/index.html');
});

app.post('/login', (req, res) => {
  const password  = req.body.password;

  if (password === pass) {
    res.sendFile(__dirname+'/public/second.html');
} else {
    res.sendFile(__dirname+'/public/index.html');
}
});

app.listen(port, () => {});
