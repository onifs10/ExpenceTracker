import express, { Request, Response } from "express";
import DB from "./db/db";
import AuthRouter from "./controllers/auth.controller";
import { json } from "body-parser";

import passport from "passport";
import passportConfig from "./config/passport.config";
import HandleProtectedRequest from "./utils/protectedRouteHandler.util";
import ExpenseRouter from "./controllers/expense.controller";

// create app
const app = express();

// passport config
passportConfig(passport);

// middlewares
app.use(json());
app.use(passport.initialize());
// test db connection

try {
  DB.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// db sync
DB.sync({ force: true }).then(() => {
  console.log("data base connected");
});

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/expenses", ExpenseRouter);

app.get("/", (req: Request, res: Response) => {
  HandleProtectedRequest(req, res, async () => {
    res.send("Expense tracker app");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
