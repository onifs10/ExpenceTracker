import { UserInstance } from "../models/User.model";
import ServiceResponseType, { ResponseStateType } from "../types/global.type";

const getExpenses = async (
  user: UserInstance
): Promise<ServiceResponseType> => {
  try {
    const expenses = await user.getExpenses();
    return {
      state: ResponseStateType.SUCCESS,
      message: "Expenses retrieved successfully",
      data: {
        expenses,
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

const createExpense = async (
  user: UserInstance,
  amount: number,
  category: string,
  description: string
): Promise<ServiceResponseType> => {
  try {
    const expense = await user.createExpense({ amount, category, description });
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

const ExpenseSevices = { createExpense, getExpenses };

export default ExpenseSevices;
