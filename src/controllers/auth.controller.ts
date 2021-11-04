import { Request, Response, Router } from "express";
import * as AuthServices from "../services/auth.services";
import Joi from "joi";
import { RegisterDataType } from "../services/auth.services";
import ServiceResponseType, { ResponseStateType } from "../types/global.type";
import { ApiResponse } from "../utils/responseHelper";
import { send } from "process";

// endpoints
const AuthRouter: Router = Router();

AuthRouter.get("/login", (req: Request, res: Response) => {
  return new ApiResponse(res)
    .message("This route requires a post request")
    .data({
      email: "string | requied",
      password: "string | required",
    }).send;
});
AuthRouter.post("/login", async (req: Request, res: Response) => {});

AuthRouter.post("/register", async (req: Request, res: Response) => {
  const response = new ApiResponse(res);
  const { email, password, username } = req.body;
  // validation
  const { error } = AuthValidators.validateRegistrationRequest({
    email,
    password,
    username,
  });
  if (error) {
    return response
      .error(422)
      .message(error.message || "incorrect body parameters")
      .data({
        email: "string | required | valid email",
        password: "string | required | min:8",
        username: "string | required | min:3",
      })
      .send();
  }
  try {
    const serviceResponse: ServiceResponseType = await AuthServices.register({
      email,
      password,
      username,
    });
    if (serviceResponse.state === ResponseStateType.SUCCESS) {
      response.success();
    } else {
      response.error(400);
    }
    response.message(serviceResponse.message);
    response.data(serviceResponse.data);
    response.send();
  } catch (e) {
    response.error(500);
    response.message("an error occured");
    response.send();
  }
});
export default AuthRouter;

// AuthValidators
const AuthValidators = {
  validateRegistrationRequest: (user: RegisterDataType) => {
    const schema = Joi.object({
      username: Joi.string().required().min(3),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    });
    return schema.validate(user);
  },
};