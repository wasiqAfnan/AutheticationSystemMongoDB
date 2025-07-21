class ApiResponse {
    constructor(message = "Success", statusCode, data = null, success = true) {
        this.statusCode = statusCode;
        this.message = message.toString();
        this.data = data;
        this.success = success;
    }
}

export default ApiResponse;
