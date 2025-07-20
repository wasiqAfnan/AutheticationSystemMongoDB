class ApiResponse {
    constructor(statusCode, message = "Success", data = null, ) {
        this.statusCode = statusCode;
        this.message = message.toString();
        this.data = data;
    }
}

export default ApiResponse;