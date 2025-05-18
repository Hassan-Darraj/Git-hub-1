import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePostPartial,
  updatePostFull,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
 router.get("/posts/:id", getPostById);
// router.post("/posts", createPost);
// router.patch("/posts/:id", updatePostPartial);  
// router.put("/posts/:id", updatePostFull);
// router.delete("/posts/:id", deletePost);

export default router;
