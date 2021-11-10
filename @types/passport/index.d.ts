import { UserInstance } from "../../src/models/User.model";
import { Express, Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: import("../../src/models/User.model").UserInstance;
    }
  }
}
