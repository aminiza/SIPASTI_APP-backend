import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 menit
const REFRESH_TOKEN_EXPIRY = '7d';

export const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY
    });

    return {accessToken, refreshToken};
};

export const verifyRefreshToken = (token) => {
    try {
        const decode = jwt.verify(token, JWT_SECRET);

        return decode.userId;
    } catch (error) {
        console.error("Invalid refresh token", err);
        return null;
    }
}