import express from "express";
import {
  getPenggunaanPupukById,
  createPenggunaanPupuk,
  updatePenggunaanPupuk,
  deletePenggunaanPupuk,
  getPenggunaanPupuk,
  validasiPenggunaan,
  cekValidasiPenggunaan,
} from "../controllers/PenggunaanPupuk.js";
import { isApproveUser, verifyUser } from "../middleware/AuthUser.js";
import { verifyAccessToken } from "../controllers/Auth.js";
const router = express.Router();

router.get("/penggunaan", verifyAccessToken, verifyUser, isApproveUser, getPenggunaanPupuk);
router.get("/penggunaan/cek-validasi", verifyAccessToken, verifyUser, cekValidasiPenggunaan);
router.get("/penggunaan/:id", verifyAccessToken, verifyUser, getPenggunaanPupukById);
router.patch("/penggunaan/:id/validasi", verifyAccessToken, verifyUser, validasiPenggunaan);
router.post("/penggunaan", verifyAccessToken, verifyUser, createPenggunaanPupuk);
router.patch("/penggunaan/:id", verifyAccessToken, verifyUser, updatePenggunaanPupuk);
router.delete("/penggunaan/:id", verifyAccessToken, verifyUser, deletePenggunaanPupuk);

export default router;