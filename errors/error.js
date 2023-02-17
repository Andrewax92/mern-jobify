import { StatusCodes } from 'http-status-codes'

class CustomAPIError extends Error {
    constructor(message) {
        super(message)
    }
}
class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = StatusCodes.BAD_REQUEST
    }
}
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = StatusCodes.NOT_FOUND
    }
}
class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = StatusCodes.UNAUTHORIZED
    }
}

export { BadRequestError, NotFoundError, CustomAPIError, UnauthenticatedError }