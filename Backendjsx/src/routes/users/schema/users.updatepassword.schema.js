const updatePasswordSchema = {
    description: ' update new password',
    tags: ['user'],
    summary: 'User update password',

    body: {
        type: 'object',
        required: ['email', 'newPassword'],
        properties: {
            email: { type: 'string', format: 'email' },
            newPassword: { type: 'string'}
        }
    },

    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            },
            example: {
                message: 'Mật khẩu đã được cập nhật thành công.'
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

module.exports = updatePasswordSchema;
