import DB from "../db/db";
import { INTEGER, Model, Optional, STRING } from "sequelize";
import { compare } from "bcrypt";
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<User, "id"> {}
interface UserInstance extends Model<User, UserCreationAttributes>, User {
  validatePassword: (password: string) => Promise<boolean>;
}

const UserModel = DB.define<UserInstance>(
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

UserModel.prototype.validatePassword = function (password: string) {
  return compare(password, this.password);
};

export default UserModel;
