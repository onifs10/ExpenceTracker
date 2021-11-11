export default interface ServiceResponseType {
  state: ResponseStateType;
  message: string;
  data?: object;
}

export enum ResponseStateType {
  SUCCESS = 1,
  ERROR = 0,
}
