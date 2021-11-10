import { UserInstance } from "../../src/models/User.model";
import { Express, Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: UserInstance | undefined;
    }
  }
}

declare module "express-serve-static-core" {
  export interface Request {
    user: UserInstance | undefined;
  }
}
