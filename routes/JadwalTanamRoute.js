import express from "express";
import {
  getJadwalTanamById,
  createJadwalTanam,
  updateJadwalTanam,
  deleteJadwalTanam,
  getJadwalTanam,
  getDropdownLahan
} from "../controllers/JadwalTanam.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { verifyAccessToken } from "../controllers/Auth.js";
const router = express.Router();

router.get("/jadwal/lahan/dropdown", verifyUser, getDropdownLahan);

router.get("/jadwal", verifyAccessToken , verifyUser, getJadwalTanam);
router.get("/jadwal/:id", verifyAccessToken, verifyUser, getJadwalTanamById);
router.post("/jadwal", verifyAccessToken, verifyUser, createJadwalTanam);
router.patch("/jadwal/:id", verifyAccessToken, verifyUser, updateJadwalTanam);
router.delete("/jadwal/:id", verifyAccessToken, verifyUser, deleteJadwalTanam);


export default router;