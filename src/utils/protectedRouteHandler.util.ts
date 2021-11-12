import { NextFunction, Request, Response } from "express";
import passport from "passport";

type HandleRequest = (req: Request, res: Response, next: NextFunction) => void;

// handle protected request middleware
const HandleProtectedRequest: HandleRequest = (req, res, next) => {
  //  calling the passport auth function
  const authenticationFunction = passport.authenticate("jwt", {
    session: false,
  });
  authenticationFunction(req, res, next);
};

export default HandleProtectedRequest;
