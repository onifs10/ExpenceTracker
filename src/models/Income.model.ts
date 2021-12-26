import DB from "../db/db";
import { FLOAT, INTEGER, Model, Optional } from "sequelize";

export interface Income {
  id: number;
  amount: number;
  user_id?: number;
}

export interface IncomeCreationAttributes extends Optional<Income, "id"> {}

export interface IncomeInstance
  extends Model<Income, IncomeCreationAttributes>,
    Income {}

const IncomeModel = DB.define<IncomeInstance>(
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
    user_id: {
      type: INTEGER,
      unique: true,
    },
  },
  {
    tableName: "income",
  }
);

export default IncomeModel;
