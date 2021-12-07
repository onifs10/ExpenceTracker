import DB from "../db/db";
import { FLOAT, INTEGER } from "sequelize";

const IncomeModel = DB.define(
  "Income",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "income",
  }
);

export default IncomeModel;
