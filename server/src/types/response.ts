type StandardResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

export default StandardResponse;
