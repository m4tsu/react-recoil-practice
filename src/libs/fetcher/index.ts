export class ServerError extends Error {}
export class NetworkError extends Error {}

type Result<T> =
  | {
      data: T;
      error: undefined;
    }
  | {
      data: undefined;
      error: ServerError | NetworkError;
    };

export const fetcher = async <TResponse>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Result<TResponse>> => {
  try {
    const response = await fetch(input, init);
    if (!response.ok) {
      return {
        error: new ServerError('Server Error'),
        data: undefined,
      };
    }
    const data: TResponse = await response.json();
    return {
      data,
      error: undefined,
    };
  } catch (e) {
    return {
      error: new NetworkError('Network Error occured'),
      data: undefined,
    };
  }
};
