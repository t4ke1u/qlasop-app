export const HTTP_ERROR = {
  VALIDATION: { message: 'Validation Error', status: 400 },
  INVALID_PATH_PARAM: { message: 'Invalid Path Param Error', status: 400 },
  INVALID_PARAMS: { message: 'Invalid Params Error', status: 400 },
  UNAUTHORIZED: { message: 'Unauthorized Error', status: 401 },
  FORBIDDEN: { message: 'Forbidden Error', status: 403 },
  NOT_FOUND: { message: 'Not Found Error', status: 404 },
  METHOD_NOT_ALLOWED: { message: 'Method Not Allowed Error', status: 405 },
  CONFLICT: { message: 'Conflict Error', status: 409 },
  INTERNAL_SERVER: { message: 'Internal Server Error', status: 500 },
  NOT_IMPLEMENTED: { message: 'Not Implemented', status: 501 },
}

export class HTTPError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  static {
    this.prototype.name = 'HttpError'
  }

  serialize() {
    return {
      status: this.status,
      key: this.cause,
      message: this.message,
    }
  }
}
