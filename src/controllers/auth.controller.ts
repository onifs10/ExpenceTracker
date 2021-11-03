import { Request, Response, Router } from "express";
import { register } from "../services/auth.services";
import ServiceResponseType, { ResponseStateType } from "../types/global.type";
import { ApiResponse } from "../utils/responseHelper";

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

  try {
    const { email, password, username } = req.body;

    //  const { error } = validate(req.body);
    /**  if(error){
     *       return response
     *       .error(422)
     *      .message("incorrect body parameters")
     *      .data({
     *        email: "string | requied | emial",
     *        password: "string|required",
     *        username: "string | required",
     * }
     */

    if (!email || !password || !username) {
      return response
        .error(422)
        .message("incorrect body parameters")
        .data({
          email: "string | requied",
          password: "string|required",
          username: "string | required",
        })
        .send();
    }
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
