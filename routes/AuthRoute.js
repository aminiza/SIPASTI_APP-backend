import express from "express";
import {
  login, 
  logout,
  Me, 
  Token
} from "../controllers/Auth.js";
const router = express.Router();

router.post("/login", login);
router.get("/refresh-token", Token);
router.post("/refresh-token", Token);
router.get("/me", Me);
router.delete("/logout", logout);

export default router;