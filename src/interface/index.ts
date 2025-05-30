export interface IResponse<T = object> {
  success: boolean;
  statusCode: number;
  message: string;
  payload: T;
}
