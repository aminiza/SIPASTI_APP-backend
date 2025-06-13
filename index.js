import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import userRouter from "./routes/UserRoute.js";
import AuthRouter from "./routes/AuthRoute.js";
import LahanRouter from "./routes/LahanRoute.js";
import JadwalTanamRouter from "./routes/JadwalTanamRoute.js";
import PupukRouter from "./routes/PupukRoute.js";
import PenggunaanPupukRouter from "./routes/PenggunaanPupukRouter.js";
import PengeluaranRouter from "./routes/PengeluaranRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

const corsOptions = {
  origin: "https://sipasti-app-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false,
  exposedHeaders: ["Set-Cookie"],
};

app.use(express.json());
app.use(cors(corsOptions));

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
      domain: process.env.NODE_ENV === "production" ? ".railway.app" : undefined,
    },
    proxy: true,
  })
);

app.use(AuthRouter);
app.use(userRouter);
app.use(LahanRouter);
app.use(JadwalTanamRouter);
app.use(PupukRouter);
app.use(PenggunaanPupukRouter);
app.use(PengeluaranRouter);

// store.sync();

// (async () => {
//   await db.sync();
//   console.log("Database connected");
// })();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
