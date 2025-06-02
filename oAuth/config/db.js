import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});

pool.connect().then(() => {
  console.log("connected to database");
});

export const query = (text,params) => pool.query(text,params)
// function query (text,params){
//     return pool.query(text,params)
// }

export default pool;