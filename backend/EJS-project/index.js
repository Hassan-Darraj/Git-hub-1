import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/create", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
      };
  posts.push(newPost);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id) );
  res.render("edit.ejs", { post });
});

app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const theupdate = {
        id: postId,
        title: req.body.title,
        content: req.body.content,
    };
    const post = posts.find(post => post.id === postId);
        post.title = theupdate.title;
        post.content = theupdate.content;
    res.redirect("/");
});


app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);  
    const index = posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      posts.splice(index, 1);
    }else{
      res.status(404).send('Sorry, cant find the post')
    }
    res.redirect("/");
  });
  
  
app.listen(port, () => {});
