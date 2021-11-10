import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import HandleProtectedRequest from "../utils/protectedRouteHandler.util";
import { ApiResponse } from "../utils/responseHelper";

const ExpenseRouter: Router = Router();

ExpenseRouter.use((req: Request, res: Response, next: NextFunction) => {
  HandleProtectedRequest(req, res, next);
});

ExpenseRouter.get("/", async (req, res) => {
  const response = new ApiResponse(res);
  return response
    .success(200)
    .data({
      expenses: await req.user?.getExpenses(),
    })
    .send();
});

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
      })
      .send();
  }
  const { amount, category } = req.body;
  const expense = await req.user?.createExpense({ amount, category });
  return response
    .success(201)
    .data({
      expense,
    })
    .send();
});

const ExpenseValidation = {
  validateExpenseRequest: (req: Request) => {
    const schema = Joi.object({
      amount: Joi.number().required(),
      category: Joi.string().required(),
    });
    return schema.validate(req.body);
  },
};

export default ExpenseRouter;
