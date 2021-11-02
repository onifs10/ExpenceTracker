import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";

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
