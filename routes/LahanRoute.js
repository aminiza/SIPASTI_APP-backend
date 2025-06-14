import express from "express";
import {
  getLahanById,
  createLahan,
  updateLahan,
  deleteLahan,
  getLahan,
} from "../controllers/Lahan.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { verifyAccessToken } from "../controllers/Auth.js";
const router = express.Router();

router.get("/lahan", verifyAccessToken, verifyUser, getLahan);
router.get("/lahan/:id", verifyAccessToken, verifyUser, getLahanById);
router.post("/lahan", verifyAccessToken, verifyUser, createLahan);
router.patch("/lahan/:id", verifyAccessToken, verifyUser, updateLahan);
router.delete("/lahan/:id", verifyAccessToken, verifyUser, deleteLahan);

export default router;