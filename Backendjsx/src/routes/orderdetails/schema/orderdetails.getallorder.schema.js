const getAllOrderDetailSchema = {
    description: 'Get all orderdetails by order',
    tags: ['orderdetails'],
    summary: 'Get all orderdetails filtered by order',
    params: {
        type: 'object',
        properties: {
            order_id: { type: 'number', description: 'Order ID to filter orderdetails' }
        },
        required: ['order_id']
    },
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
                message: 'Invalid order_id parameter'
            }
        }
    }
};

module.exports = getAllOrderDetailSchema;
