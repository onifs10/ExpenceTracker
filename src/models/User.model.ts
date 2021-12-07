import DB from "../db/db";
import ExpenseModel, {
  ExpenseInstance,
  ExpensesCreationAttributes,
} from "./Expense.model";
import { INTEGER, Model, Optional, STRING, WhereOptions } from "sequelize";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth.config";
import { queryProps } from "../types/global.type";
import TransactionModel from "./Transaction.model";

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

export interface UserCreationAttributes extends Optional<User, "id"> {}
export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {
  password: undefined;
  validatePassword: (password: string) => Promise<boolean>;
  genrateToken: () => { token: string; expires: number };
  getExpenses: (query?: queryProps) => Promise<ExpenseInstance[]>;
  createExpense: (
    expense: ExpensesCreationAttributes
  ) => Promise<ExpenseInstance>;
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

UserModel.prototype.genrateToken = function () {
  const payload = {
    sub: this.id,
    iat: Date.now(),
  };
  const signedToken: string = sign(payload, authConfig.secret_key, {
    expiresIn: authConfig.expiresIn,
  });
  return {
    token: "Bearer " + signedToken,
    expires: authConfig.expiresIn,
  };
};

UserModel.hasMany(ExpenseModel, {
  foreignKey: { name: "user_id", allowNull: false },
});

TransactionModel.belongsTo(UserModel)

export default UserModel;
