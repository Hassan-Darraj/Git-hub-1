import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

import morgan from "morgan";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let userInfo = {
  email: null,
  password: null,
};

const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" } 
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: true }));

function saveToDB(req, res, next) {
    if (req.body && req.body.email && req.body.password) {
        userInfo.email = req.body.email;
        userInfo.password = req.body.password;
      }
      next();
}
app.use(saveToDB)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send(
    `<h1>Your email ${userInfo.email} and Password ${userInfo.password}</h1>`
  );
});

app.listen(port, () => {});
