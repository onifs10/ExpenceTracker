import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import HandleProtectedRequest from "../utils/protectedRouteHandler.util";
import { ApiResponse } from "../utils/responseHelper";
import ExpenseSevices from "../services/expense.services";
import generateResponse from "../utils/generateResponse";

const ExpenseRouter: Router = Router();

// authentication middleware added
ExpenseRouter.use((req: Request, res: Response, next: NextFunction) => {
  HandleProtectedRequest(req, res, next);
});

// get all expenses
ExpenseRouter.get("/", async (req, res) => {
  const response = new ApiResponse(res);
  const serviceResponse = await ExpenseSevices.getExpenses(req.user!);
  generateResponse(serviceResponse, response);
  response.send();
});

// add expense
ExpenseRouter.post("/", async (req, res) => {
  const response = new ApiResponse(res);
  const { error } = ExpenseValidation.validateExpenseRequest(req);
  if (error) {
    return response
      .error(422)
      .message(error.message || "incorrect body parameters")
      .data({
        amount: "required | float",
        category: "required | string",
        description: "required | string",
      })
      .send();
  }
  const { amount, category, description } = req.body;
  const serviceResponse = await ExpenseSevices.createExpense(
    req.user!,
    amount,
    category,
    description
  );
  generateResponse(serviceResponse, response);
  response.send();
});

const ExpenseValidation = {
  validateExpenseRequest: (req: Request) => {
    const schema = Joi.object({
      amount: Joi.number().required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
    });
    return schema.validate(req.body);
  },
};

export default ExpenseRouter;
