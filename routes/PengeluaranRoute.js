import express from "express";
import {
  getPengeluaranById,
  createPengeluaran,
  updatePengeluaran,
  deletePengeluaran,
  getPengeluaran,
  getJadwalDropdown
} from "../controllers/Pengeluaran.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { verifyAccessToken } from "../controllers/Auth.js";
const router = express.Router();

router.get("/pengeluaran/jadwal/dropdown", verifyUser, getJadwalDropdown);

router.get("/pengeluaran", verifyAccessToken, verifyUser, getPengeluaran);
router.get("/pengeluaran/:id", verifyAccessToken, verifyUser, getPengeluaranById);
router.post("/pengeluaran", verifyAccessToken, verifyUser, createPengeluaran);
router.patch("/pengeluaran/:id", verifyAccessToken, verifyUser, updatePengeluaran);
router.delete("/pengeluaran/:id", verifyAccessToken, verifyUser, deletePengeluaran);

export default router;