import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import IncomeService from "../services/income.service";
import generateResponse from "../utils/generateResponse";
import HandleProtectedRequest from "../utils/protectedRouteHandler.util";
import { ApiResponse } from "../utils/responseHelper";

const IncomeRouter: Router = Router();

// authentication middleware added
IncomeRouter.use((req: Request, res: Response, next: NextFunction) => {
  HandleProtectedRequest(req, res, next);
});

IncomeRouter.get("/", async (req, res) => {
  const response = new ApiResponse(res);
  const serviceResponse = await IncomeService.get({ user_id: req.user!.id });
  generateResponse(serviceResponse, response);
  response.send();
});

IncomeRouter.post("/", async (req, res) => {
  const response = new ApiResponse(res);
  const { error } = IncomeValidation.create(req);
  if (error) {
    return response
      .error(422)
      .message(error.message || "incorrect body parameters")
      .data({
        amount: "required | float",
      })
      .send();
  }
  const serviceResponse = await IncomeService.create({
    user_id: req.user!.id,
    amount: req.body.amount,
  });
  generateResponse(serviceResponse, response);
  response.send();
});

const IncomeValidation = {
  create: (req: Request) => {
    const schema = Joi.object({
      amount: Joi.number().required(),
    });
    return schema.validate(req.body);
  },
};

export default IncomeRouter;
