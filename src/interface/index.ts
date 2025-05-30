export interface IResponse {
  success: boolean;
  statusCode: number;
  message: string;
  payload: any;
}

export interface ISendRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
}
