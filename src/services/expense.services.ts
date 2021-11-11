import { use } from "passport";
import ExpenseModel from "../models/Expense.model";
import { UserInstance } from "../models/User.model";
import ServiceResponseType, { ResponseStateType } from "../types/global.type";

const createExpense = async (
  user: UserInstance,
  amount: number,
  category: string,
  description: string
): Promise<ServiceResponseType> => {
  try {
    const expense = await user.createExpense({ amount, category, description });
    expense.setDataValue("user_id", undefined);
    return {
      state: ResponseStateType.SUCCESS,
      message: "Expense created successfully",
      data: {
        expense,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      state: ResponseStateType.ERROR,
      message: "Error creating expense",
    };
  }
};

const getSingleExpense = async (userId: number, expenseId: number) => {
  try {
    const expense = await ExpenseModel.findOne({
      where: { id: expenseId, user_id: userId },
    });
    if (expense) {
      return {
        state: ResponseStateType.SUCCESS,
        message: "Expense retrieved successfully",
        data: {
          expense,
        },
      };
    }
    return {
      state: ResponseStateType.ERROR,
      message: "Expense not found",
      statusCode: 404,
    };
  } catch (e) {
    console.log(e);
    return {
      state: ResponseStateType.ERROR,
      message: "Error retrieving expense",
    };
  }
};

const getExpenses = async (
  user: UserInstance
): Promise<ServiceResponseType> => {
  try {
    const expenses = await user.getExpenses();
    return {
      state: ResponseStateType.SUCCESS,
      message: "Expenses retrieved successfully",
      data: {
        expenses: expenses.map((expense) => {
          expense.setDataValue("user_id", undefined);
          return expense;
        }),
      },
    };
  } catch (e) {
    // change to log error to any loggger to be used
    console.log(e);
    return {
      state: ResponseStateType.ERROR,
      message: "Error retrieving expenses",
    };
  }
};

const updateExpense = async (
  userId: number,
  expenseId: number,
  amount?: number,
  category?: string,
  description?: string
): Promise<ServiceResponseType> => {
  try {
    const expense = await ExpenseModel.findOne({
      where: { user_id: userId, id: expenseId },
    });
    if (expense) {
      expense.update({ amount, category, description });
      return {
        state: ResponseStateType.SUCCESS,
        message: "Expense udpated",
        data: {
          expense,
        },
      };
    }
    return {
      state: ResponseStateType.ERROR,
      message: "Expense not found",
      statusCode: 404,
    };
  } catch (e) {
    console.log(e);
    return {
      state: ResponseStateType.ERROR,
      message: "Error updating expense",
    };
  }
};

const deleteExpense = async (userId: number, expenseId: number) => {
  try {
    const expense = await ExpenseModel.findOne({
      where: { user_id: userId, id: expenseId },
    });
    if (expense) {
      expense.destroy();
      return {
        state: ResponseStateType.SUCCESS,
        message: "Expense deleted",
      };
    }
    return {
      state: ResponseStateType.ERROR,
      message: "Expense not found",
      statusCode: 404,
    };
  } catch (e) {
    console.log(e);
    return {
      state: ResponseStateType.ERROR,
      message: "Error deleting expense",
    };
  }
};
const ExpenseSevices = {
  createExpense,
  getExpenses,
  updateExpense,
  getSingleExpense,
  deleteExpense,
};

export default ExpenseSevices;
