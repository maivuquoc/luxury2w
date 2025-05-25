const updateOrderDetailsSchema = {
    description: 'Update one order detail',
    tags: ['orderdetails'],
    summary: 'Update one order detail',
    headers: {
        type: 'object',
        properties: {
            Authorization: { type: 'string' },
        },
        required: ['Authorization']
    }, 
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        required: ['order_id', 'product_id', 'price'],
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
        }
    }
};

module.exports = updateOrderDetailsSchema;
