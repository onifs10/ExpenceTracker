import DB from "../db/db";
import { DATE, FLOAT, INTEGER, Model, Optional, STRING, TEXT } from "sequelize";



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
        allowNull: false
    }
  },
  {
    tableName: "income",
  }
);



export default IncomeModel;