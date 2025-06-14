import PenggunaanPupuk from "../models/PenggunaanPupukModel.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId && !req.headers.authorization) {
    return res.status(401).json({ message: "unauthorized" });
  }

  if(req.headers.authorization) {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    req.role = decode.role;
  } else {
    req.userId = req.session.userId;
  }

  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.role !== "Admin")
    return res.status(403).json({ message: "Access denied" });
  next();
};

export const isApproveUser = async (req, res, next) => {
  const penggunaan = await PenggunaanPupuk.findOne({
    where: {
      createdBy: req.session.userId,
      status: "approve"
    }
  });

  if(!penggunaan && req.role !== "Admin") {
    return res.status(404).json({message: "Anda belum divalidasi oleh admin untuk mengakses halaman ini"});
  }
  next();
};
