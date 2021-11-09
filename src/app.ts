import express, { Request, Response } from "express";
import DB from "./db/db";
import AuthRouter from "./controllers/auth.controller";
import { json } from "body-parser";
<<<<<<< HEAD
import UserModel from "./models/User.model";
import ExpenseModel from "./models/Expense.model";

=======
import passport from "passport";
import passportConfig from "./config/passport.config";
import HandleProtectedRequest from "./utils/protectedRouteHandler.util";
>>>>>>> 7fac7ccf26cf7ce76fb390687834d4b318c2a1b3
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

UserModel.hasMany(ExpenseModel, {
  foreignKey: 
  {name: 'user_id',
  allowNull: false}
});


// db sync
DB.sync().then(() => {
  console.log("data base connected");
});

// routes
app.use("/api/auth", AuthRouter);

app.get("/", (req: Request, res: Response) => {
  HandleProtectedRequest(req, res, async (req: Request, res: Response) => {
    res.send("The sedulous hyena ate the antelope!");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
