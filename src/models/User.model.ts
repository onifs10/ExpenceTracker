import DB from "../db/db";
import { INTEGER, STRING } from "sequelize";

const UserModel = DB.define(
  "User",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      unique: true,
    },
  },
  {
    tableName: "users",
  }
);

export default UserModel;
