class ApiError extends Error {
    constructor(
        message = "Operation Failed",
        statusCode = 500,
        success = false
    ) {
        super(message);
        this.statusCode = Number(statusCode);
        this.data = null;
        this.success = success;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
