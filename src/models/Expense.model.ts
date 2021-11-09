import DB from "../db/db";
import { DATE, FLOAT, INTEGER, Model, Optional, STRING } from "sequelize";
import { userInfo } from "os";


const ExpenseModel = DB.define(
    "Expense",{
        id:{
            type: INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        category:{
            type: STRING
        },
        amount: {
            type: FLOAT,
            allowNull: false
        },
        date: {
            type: DATE
        },
    /*   user_id:{
            type: INTEGER
           
      }*/
       
    },
    {
        tableName: "expenses",
      }
    
);
  export default ExpenseModel;