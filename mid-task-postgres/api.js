import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "userMange",
  password: "Jordan@654321",
  port: 5432,
});
db.connect()
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query(
    "SELECT * FROM admins WHERE username = $1 AND password = $2",
    [username, password]
  );
  res.send({ success: result.rows.length > 0 });
});

// Create user
app.post("/api/users", async (req, res) => {
  const { email, name, phone, gender, address } = req.body;
  try {
    await db.query(
      "INSERT INTO users (email, name, phone, gender, address) VALUES ($1, $2, $3, $4, $5)",
      [email, name, phone, gender, address]
    );
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  const result = await db.query("SELECT * FROM users ORDER BY id DESC");
  res.send(result.rows);
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  const { email, name, phone, gender, address } = req.body;
  const { id } = req.params;
  await db.query(
    "UPDATE users SET email=$1, name=$2, phone=$3, gender=$4, address=$5 WHERE id=$6",
    [email, name, phone, gender, address, id]
  );
  res.send({ success: true });
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  await db.query("DELETE FROM users WHERE id=$1", [req.params.id]);
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});