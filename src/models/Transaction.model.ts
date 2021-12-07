import DB from "../db/db";
import { INTEGER } from "sequelize";

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
