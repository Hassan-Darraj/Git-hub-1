import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";

const app = express();
const port = 3000;
const api_url = "http://localhost:4000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/api/users`);
    res.render("index", { users: response.data });
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Client running at http://localhost:${port}`);
});