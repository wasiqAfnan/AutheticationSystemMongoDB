class ApiResponse {
    constructor(message = "Success", statusCode, data = null, ) {
        this.statusCode = statusCode;
        this.message = message.toString();
        this.data = data;
    }
}

export default ApiResponse;