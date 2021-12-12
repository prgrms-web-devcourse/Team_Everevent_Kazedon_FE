import { AxiosResponse, AxiosResponseHeaders } from 'axios';

export interface ErrorType {
  code: number | null;
  message: string | null;
}

export interface ResType {
  data: keyof AxiosResponse;
  headers: AxiosResponseHeaders;
  error: ErrorType;
}
