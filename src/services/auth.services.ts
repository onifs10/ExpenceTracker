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
    // hash password
    // store database
    // return sucessful response
    const userData = await UserModel.create(data);

    return {
      state: ResponseStateType.SUCCESS,
      data: {
        messsage: "account created succesfully",
        user: userData,
      },
    };
  } catch (e) {
    return {
      state: ResponseStateType.ERROR,
    };
  }
};
