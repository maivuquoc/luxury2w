const checkEmailSchema = {
    description: 'Check if email exists in the system',
    tags: ['user'],
    summary: 'Check email existence',
    body: {
        type: 'object',
        required: ['email'],
        properties: {
            email: { type: 'string', format: 'email' }
        }
    },

    response: {
        200: {
            type: 'object',
            properties: {
                exists: { type: 'boolean' }
            },
            example: {
                exists: true
            }
        },
        404: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 404,
                error: 'Not Found',
                message: 'Email không tồn tại trong hệ thống.'
            }
        },
        500: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Lỗi hệ thống'
            }
        }
    }
};

module.exports = checkEmailSchema;
