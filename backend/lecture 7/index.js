import https from "https";
import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res) => {
     
  });

  const request = https.get()
app.listen(port, ()=>{});