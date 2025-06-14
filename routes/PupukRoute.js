import express from "express";
import {
  getPupukById,
  createPupuk,
  updatePupuk,
  deletePupuk,
  getPupuk,
} from "../controllers/Pupuk.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import { verifyAccessToken } from "../controllers/Auth.js";
const router = express.Router();

router.get("/pupuk", verifyAccessToken, verifyUser, getPupuk);
router.get("/pupuk/:id", verifyAccessToken, verifyUser, adminOnly, getPupukById);
router.post("/pupuk", verifyAccessToken, verifyUser, adminOnly, createPupuk);
router.patch("/pupuk/:id", verifyAccessToken, verifyUser, adminOnly, updatePupuk);
router.delete("/pupuk/:id", verifyAccessToken, verifyUser, adminOnly, deletePupuk);

export default router;