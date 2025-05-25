const deleteOrderDetailsSchema = {
    description: 'Delete an order detail',
    tags: ['orderdetails'],
    summary: 'Delete an order detail',
    headers: {
        type: 'object',
        properties: {
            Authorization: { type: 'string' },
        },
        required: ['Authorization']
    }, 
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                order_id: { type: 'number' },
                product_id: { type: 'number' },
                price: { type: 'number' },
                discount: { type: 'number' },
                qty: { type: 'number' },
                amount: { type: 'number' },
                is_paid: { type: 'number' },
                status: { type: 'number' },
            }
        },

        400: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 400,
                error: 'Bad request',
                message: 'Invalid query parameters'
            }
        },

        403: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 403,
                error: 'Forbidden',
                message: 'Access denied'
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
                message: 'Resource not found'
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
                message: 'Something went wrong'
            }
        }
    }
};

module.exports = deleteOrderDetailsSchema;
