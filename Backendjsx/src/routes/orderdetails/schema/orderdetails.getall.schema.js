const getAllOrderDetailsSchema = {
    description: 'Get all order details',
    tags: ['orderdetails'],
    summary: 'Get all order details',
    response: {
        200: {
            type: 'array',
            items: {
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
        }
    }
};

module.exports = getAllOrderDetailsSchema;
