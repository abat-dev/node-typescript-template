class HttpRequestError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'HttpRequestError';
    }
  }
  
  export default HttpRequestError;