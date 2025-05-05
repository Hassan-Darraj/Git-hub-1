import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const port = 3000;
app.use(express.static("public"));
const __dirname = dirname(fileURLToPath(import.meta.url));


const arr1 = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "George",
  "Hannah",
  "Ivan",
  "Julia",
];
const arr2 = [
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Aiden",
    "Sophia",
    "Lucas",
    "Amelia",
    "Mason",
    "Isabella"
];
  
app.get('/', (req, res) => {
    res.render('index.ejs');  
  });


app.post('/submit', (req, res) => {
    const randomName1 = arr1[Math.floor(Math.random()* arr1.length) ]
    const randomName2 = arr2[Math.floor(Math.random()* arr2.length)]
    res.render('index.ejs',{
        name1:randomName1,
        name2:randomName2,
    })
  });

  
app.listen(port, () => {});
