const updateOrdersSchema = {
    description: 'Update one order',
    tags: ['order'],
    summary: 'Update one order',
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
        required: ['user_id', 'name', 'phone', 'email', 'address'],
        properties: {
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
    },

    response: {
        200: {
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

module.exports = updateOrdersSchema;
