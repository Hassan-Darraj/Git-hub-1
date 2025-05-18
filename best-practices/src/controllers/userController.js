import pool from "../config/db.js";

// create user

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query("INSERT INTO users (name,email) VALUES ($1,$2)", [
      name,
      email,
    ]);
  } catch (error) {
  }
};

// read
export const getUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.render("index.ejs", { users: result.rows });
};

//update
export const updateUsers = async (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
    name,
    email,
    id,
  ]);
};

//delete
export const deleteUsers = async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM users WHERE id= $1", [id]);
};
