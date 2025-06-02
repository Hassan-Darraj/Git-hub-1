import { query } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserModel = {
  async create({ email, password, name }) {
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
      const { rows } = await query(
        `INSERT INTO users (email,password,name) 
        VALUES ($1,$2,$3)
        RETURNING *`,
        [email, hashedPassword, name]
      );
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Email Already Exist");
      }
      throw error;
    }
  },

  async findByEmail(email) {
    try {
      const { rows } = await query(`SELECT * FROM users WHERE email=$1`, [
        email,
      ]);
      if (rows.length > 0) {
        return rows[0];
      } 
    } catch (error) {
      throw error;
    }
  },

  async findById(id) {
    const { rows } = await query(`SELECT id, email, password, role FROM users WHERE id=$1`, [id]);
    return rows[0];
  },

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  },

  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  async updatePassword(userId, newPassword) {
    const hashedNewPassword = bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    await query(`UPDATE users SET password = $1 WHERE id=$2`, [
      hashedNewPassword,
      userId,
    ]);
  },
};

export default UserModel;
