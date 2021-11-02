import UserModel from "../models/User.model";
import ServiceResponseType, { ResponseStateType } from "../types/global.type";

export const register = async (
  data: RegisterDataType
): Promise<ServiceResponseType> => {
  try {
    const userData = await UserModel.create(data);
    return {
      state: ResponseStateType.SUCCESS,
      data: userData,
    };
  } catch (e) {
    return {
      state: ResponseStateType.ERROR,
    };
  }
};

export type RegisterDataType = {
  email: string;
  password: string;
  username: string;
};
