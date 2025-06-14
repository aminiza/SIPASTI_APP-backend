import express from "express";
import {
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  getUsers,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import { verifyAccessToken } from "../controllers/Auth.js";
const router = express.Router();

router.get("/users", verifyAccessToken, verifyUser, adminOnly,getUsers);
router.get("/users/:id", verifyAccessToken, verifyUser, adminOnly, getUsersById);
router.post("/users", verifyAccessToken, verifyUser, adminOnly, createUsers);
router.patch("/users/:id", verifyAccessToken, verifyUser, adminOnly, updateUsers);
router.delete("/users/:id", verifyAccessToken, verifyUser, adminOnly, deleteUsers);

export default router;