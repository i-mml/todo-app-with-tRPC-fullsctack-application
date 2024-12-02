import StandardResponse from "../types/response";

export const createResponse = <T>(
  success: boolean,
  message: string,
  data?: T,
  error?: string
): StandardResponse<T> => ({
  success,
  message,
  ...(data ? { data } : {}),
  ...(error ? { error } : {}),
});
