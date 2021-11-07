import { Request, Response } from "express";
import passport from "passport";

type HandleRequest = (
  req: Request,
  res: Response,
  cb: (req: Request, res: Response) => Promise<void>
) => void;

const HandleProtectedRequest: HandleRequest = (req, res, cb) => {
  passport.authenticate("jwt", { session: false })(req, res, () =>
    cb(req, res)
  );
};

export default HandleProtectedRequest;
