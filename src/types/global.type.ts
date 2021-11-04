export default interface ServiceResponseType {
  state: ResponseStateType;
  message: string;
  data?: any;
}

export enum ResponseStateType {
  SUCCESS = 1,
  ERROR = 0,
}
