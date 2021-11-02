import { Response } from "express";

export class ApiResponse {
  constructor(
    public res: Response,
    private resMessage: string = "",
    private statusCode: number = 200,
    private status: string = "suceess",
    private resData?: object
  ) {}
  success(code: number = 200) {
    this.status = "success";
    this.statusCode = code;
    return this;
  }
  error(code: number = 400) {
    this.status = "error";
    this.statusCode = code;
    return this;
  }
  message(message: string) {
    this.resMessage = message;
    return this;
  }
  data(data: object) {
    this.resData = data;
    return this;
  }
  send(data?: object) {
    if (!this.resData) {
      this.res.status(this.statusCode).json({
        status: this.status,
        message: this.resMessage,
      });
    } else {
      this.res.status(this.statusCode).json({
        status: this.status,
        message: this.resMessage,
        data: data || this.resData,
      });
    }
  }
}
