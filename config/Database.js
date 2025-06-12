import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("scedule_petani", "root", "", {
    host: "localhost",
    port: "3306",
    dialect: "mysql", 
});

export default db;