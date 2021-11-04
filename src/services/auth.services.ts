import UserModel from "../models/User.model";
import ServiceResponseType, { ResponseStateType } from "../types/global.type";

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
    // make sure email is lower case
    // store database
    // return sucessful response
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
