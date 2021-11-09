import UserModel from "../models/User.model";
import { genSalt, hash , compare} from "bcrypt";

import ServiceResponseType, { ResponseStateType } from "../types/global.type";
import { resolve } from "path/posix";
import { userInfo } from "os";
import { Model } from "sequelize/types";

// types
export type RegisterDataType = {
  email: string;
  password: string;
  username: string;
};

export type LoginDataType = {
  email: string;
  password: string;
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
    const salt = await genSalt(10);
    data.password = await hash(data.password, salt);
    // make sure email is lower case
    data.email = data.email.toLowerCase();
    // create user
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

export const login = async (
  data: LoginDataType
): Promise<ServiceResponseType> => {
  try {
    // check if user exist
    const user = await UserModel.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return {
        state: ResponseStateType.ERROR,
        message: "Invalid credentials",
      };
    }
    // hash password
    const validPassword = await compare(data.password, user.password)
    if(!validPassword){
      return {
        state: ResponseStateType.ERROR,
        message: "Invalid credentials",
      };
    } else {
      return {
        state: ResponseStateType.SUCCESS,
        message: "logged in succesfully",
        data: {
          user,
          ...user.genrateToken(),
        },
      };
    }
  } catch (e: any) {
    return {
      state: ResponseStateType.ERROR,
      message: e.message,
    };
  }
};
