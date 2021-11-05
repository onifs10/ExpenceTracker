import { Sequelize } from "sequelize";
import dbCon from "../config/db.config";

const dbConfig = dbCon.configTwo;

// creating an instance of Sequelize to db connection
const sequelize: Sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);
const DB: Sequelize = sequelize;

export default DB;
