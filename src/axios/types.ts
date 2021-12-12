import { AxiosResponseHeaders } from 'axios';

export interface ErrorType {
  code: number | null;
  message: string | null;
}

export interface ResType<T = any> {
  data: T;
  headers: AxiosResponseHeaders;
  error: ErrorType;
}
