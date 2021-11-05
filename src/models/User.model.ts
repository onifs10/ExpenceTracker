import DB from "../db/db";
import { INTEGER, ModelDefined, Optional, STRING } from "sequelize";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<User, "id"> {}

const UserModel: ModelDefined<User, UserCreationAttributes> = DB.define(
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
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [8, 1024],
      },
    },
  },

  {
    tableName: "users",
  }
);

export default UserModel;
