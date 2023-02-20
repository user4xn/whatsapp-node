

function ApiResponse(message, code, status, data) {
    return {
        meta: {
            message,
            code,
            status
        },
        data
    }
}

module.exports = ApiResponse
