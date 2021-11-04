import { Request, Response, Router } from "express";
import { register } from "../services/auth.services";
import   validateUser  from "../controllers/validation.controller";
import ServiceResponseType, { ResponseStateType } from "../types/global.type";
import { ApiResponse } from "../utils/responseHelper";
import UserModel from "../models/User.model";
import { where } from "sequelize/types";
const AuthRouter: Router = Router();
AuthRouter.get("/login", (req: Request, res: Response) => {
  return new ApiResponse(res)
    .message("This route requires a post request")
    .data({
      email: "string | requied",
      password: "string | required",
    }).send;
});
AuthRouter.post("/login", async (req: Request, res: Response) => {
  
});
AuthRouter.post("/register", async (req: Request, res: Response) => {
  const response = new ApiResponse(res);
  const { error } = validateUser(req.body);
  if(error){
    return response
        .error(422)
        .message("incorrect body parameters")
        .data({
          email: "string | required",
          password: "string|required",
          username: "string | required",
        })
  }
  let user = await UserModel.findOne({
    where:{
      email: req.body.email
    }
  });
  if(user) res.status(400).send('user already')
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return response
        .error(422)
        .message("incorrect body parameters")
        .data({
          email: "string | required",
          password: "string|required",
          username: "string | required",
        })
        .send();
    }
    console.log(email);
    const serviceResponse: ServiceResponseType = await register({
      email,
      password,
      username,
    });
    if (serviceResponse.state === ResponseStateType.SUCCESS) {
      response.success();
    } else {
      response.error(400);
    }
    response.data(serviceResponse.data);
    response.send();
  } catch (e) {
    response.error(500);
    response.message("an error occured");
    response.send();
    console.log(e);
  }
});
export default AuthRouter;
