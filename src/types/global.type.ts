export default interface ServiceResponseType {
  state: ResponseStateType;
  data?: any;
}

export enum ResponseStateType {
  SUCCESS = 1,
  ERROR = 0,
}
