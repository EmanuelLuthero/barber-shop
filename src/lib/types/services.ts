type ServiceResponseWithoutError<T> = {
  data: T;
  error?: never;
};

export type ServiceResponseWithError = {
  data?: never;
  error: string;
};

export type ServiceResponse<T> = ServiceResponseWithoutError<T> | ServiceResponseWithError;
