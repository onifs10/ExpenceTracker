import DB from "../db/db";
import { DATE, FLOAT, INTEGER, Model, Optional, STRING } from "sequelize";

interface Expense {
  id: number;
  category: string;
  amount: number;
}

export interface ExpensesCreationAttributes extends Optional<Expense, "id"> {}
export interface ExpenseInstance
  extends Model<Expense, ExpensesCreationAttributes>,
    Expense {}

const ExpenseModel = DB.define(
  "Expense",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    category: {
      type: STRING,
    },
    amount: {
      type: FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "expenses",
  }
);
export default ExpenseModel;
