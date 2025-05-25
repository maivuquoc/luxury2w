const getAllOrdersUserSchema = {
    description: 'Get all orders by user_id',
    tags: ['order'],
    summary: 'Get all orders filtered by user_id',
    params: {
        type: 'object',
        properties: {
            user_id: { type: 'number', description: 'User ID to filter orders' }
        },
        required: ['user_id']
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    user_id: { type: 'number' },
                    name: { type: 'string' },
                    phone: { type: 'string' },
                    email: { type: 'string' },
                    address: { type: 'string' },
                    created_at: { type: 'number' },
                    updated_at: { type: 'number' },
                    updated_by: { type: 'number' },
                    status: { type: 'number' },
                    is_paid: {type: 'number'},

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
                message: 'Invalid user_id parameter'
            }
        }
    }
};

module.exports = getAllOrdersUserSchema;
