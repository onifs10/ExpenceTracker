import DB from "../db/db";
import { DATE, FLOAT, INTEGER, Model, Optional, STRING, TEXT } from "sequelize";
import UserModel from "./User.model";


const TransactionModel = DB.define(
  "Transaction",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "transaction",
  }
);



export default TransactionModel;
