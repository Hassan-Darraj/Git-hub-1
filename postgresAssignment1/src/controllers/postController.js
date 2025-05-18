import pool from "../config/db.js";

export const getPosts = async (req, res) => {
 
    console.log('Call posts')
    const result = await pool.query("SELECT * FROM posts ORDER BY id");
    res.render('index.ejs',{posts: result.rows});

 
};

export const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length > 0) res.json(result.rows[0]);
    else res.status(404).json({ error: "Post not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  const { post, description, writer } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts(post,description,writer) VALUES($1,$2,$3) RETURNING *",
      [post, description, writer]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePostPartial = async (req, res) => {
  const id = req.params.id;
  const { post, description, writer } = req.body;
  try {
    const fields = [];
    const values = [];
    let count = 1;

    if (post) {
      fields.push(`post = $${count++}`);
      values.push(post);
    }
    if (description) {
      fields.push(`description = $${count++}`);
      values.push(description);
    }
    if (writer) {
      fields.push(`writer = $${count++}`);
      values.push(writer);
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE posts SET ${fields.join(", ")}, date=NOW() WHERE id = $${count} RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: `Post id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePostFull = async (req, res) => {
  const id = parseInt(req.params.id);
  const { post, description, writer } = req.body;
  try {
    const result = await pool.query(
      "UPDATE posts SET post=$1, description=$2, writer=$3, date=NOW() WHERE id=$4 RETURNING *",
      [post, description, writer, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: `Post id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: `Post id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
