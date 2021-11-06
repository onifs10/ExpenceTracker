import express, { Request, Response } from "express";
import { ApiResponse } from "./utils/responseHelper";
import DB from "./db/db";
import AuthRouter from "./controllers/auth.controller";
import { json } from "body-parser";
import passport from "passport";
import authMiddleware from "./middlewares/auth.middleware";
// create app
const app = express();

// middlewares
app.use(json());
app.use(passport.initialize());
authMiddleware(passport);
// test db connection
try {
  DB.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// db sync
DB.sync().then(() => {
  console.log("data base connected");
});

// routes
app.get("/", (req, res) => {
  passport.authenticate("jwt", { session: false })(req, res, () => {
    console.log(req.user);
    res.send("The sedulous hyena ate the antelope!");
  });
});
app.use("/api/auth", AuthRouter);

// with type annotation
app.get("/success", (req: Request, res: Response) => {
  res
    .json({
      status: "success",
      message: "successfull endpoint hit",
    })
    .status(200)
    .send();
});

// with type annotation
app.get("/error", (req: Request, res: Response) => {
  res
    .json({
      status: "error",
      message: "an error occurred",
    })
    .status(400)
    .send();
});

// using api response util class i created this would help with uniformity
app.get("/sample", (req: Request, res: Response) => {
  const apiRes: ApiResponse = new ApiResponse(res);
  apiRes
    .message("this a sample response")
    .success()
    .send({
      user: {
        name: "okafor",
        email: "okaforchisom@gmail.com",
        token: "test",
      },
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
