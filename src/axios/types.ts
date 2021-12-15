import { AxiosResponseHeaders } from 'axios';

export interface ErrorType {
  code: number | null;
  message: string | null;
}

export interface ResType<T> {
  data: T;
  headers: AxiosResponseHeaders;
  error: ErrorType;
}
