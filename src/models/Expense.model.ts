import DB from "../db/db";
import { DATE, FLOAT, INTEGER, Model, Optional, STRING, TEXT } from "sequelize";

interface Expense {
  id: number;
  category: string;
  description: string;
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
    description: {
      type: TEXT,
      allowNull: false,
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
