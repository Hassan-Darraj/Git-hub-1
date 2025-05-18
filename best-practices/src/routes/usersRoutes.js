import express from "express";
import {
  createUser,
  deleteUsers,
  getUsers,
  updateUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/createUser", createUser);
router.get("/update/:id", updateUsers);
router.get("/delete/:id", deleteUsers);


export default router;