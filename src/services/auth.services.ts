import UserModel from "../models/User.model";
import bcrypt, { genSalt, hash } from "bcrypt";
import ServiceResponseType, { ResponseStateType } from "../types/global.type";
import e from "express";
import { resolve } from "path/posix";

// types
export type RegisterDataType = {
  email: string;
  password: string;
  username: string;
};

// functions

export const register = async (
  data: RegisterDataType
): Promise<ServiceResponseType> => {
  try {
    // check if user exist
    const user = await UserModel.findOne({
      where: {
        email: data.email,
      },
    });
    if (user) {
      return {
        state: ResponseStateType.ERROR,
        message: "user already registered",
      };
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    // make sure email is lower case
    data.email = data.email.toLowerCase();

    const userData = await UserModel.create(data);
      return {
      state: ResponseStateType.SUCCESS,
      message: "account created succesfully",
      data: {
        user: userData,
      },
    };
  } catch (e: any) {
    return {
      state: ResponseStateType.ERROR,
      message: e.message,
    };
  }
};
