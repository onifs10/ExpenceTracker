import { FindOptions, WhereOptions } from "sequelize/types";

export default interface ServiceResponseType {
  state: ResponseStateType;
  message: string;
  statusCode?: number;
  data?: object;
}

export enum ResponseStateType {
  SUCCESS = 1,
  ERROR = 0,
}

export type queryProps = FindOptions<any> | WhereOptions<any>;
