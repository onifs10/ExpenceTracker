import { NextFunction, Request, Response } from "express";
import passport from "passport";

type HandleRequest = (req: Request, res: Response, next?: NextFunction) => void;

const HandleProtectedRequest: HandleRequest = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, () => {
    if (next) {
      next();
    }
  });
};

export default HandleProtectedRequest;
