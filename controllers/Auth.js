import Users from "../models/UserModel.js";
import argon2 from "argon2";
import { generateTokens, verifyRefreshToken } from "../src/utils/jwt.js";
import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token not found" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid access token" });
  }
};

export const Token = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "refresh token not found" });
  }

  const userId = verifyRefreshToken(refreshToken);
  if (!userId) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId);
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};

export const login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ message: "Invalid Password" });

  req.session.userId = user.uuid;
  req.session.role = user.role;

  const { accessToken, refreshToken } = generateTokens(user.uuid);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json(
    {
      uuid,
      name,
      email,
      role,
    },
    { accessToken }
  );
};

export const Me = async (req, res) => {
  if (!req.session.userId && !req.headers.authorization) {
    return res.status(401).json({ message: "Mohon login diakun anda" });
  }

  if (req.session.userId) {
    const user = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.session.userId,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: decode.userId,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Logout failed" });
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout success" });
  });
};
