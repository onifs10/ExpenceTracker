import express, { Request, Response } from "express";
import { ApiResponse } from "./utils/responseHelper";

const app = express();

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

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
  const apiRes = new ApiResponse(res);
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
