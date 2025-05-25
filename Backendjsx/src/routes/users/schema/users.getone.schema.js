const getOneUsersSchema = {
    description: 'Get one user',
    tags: ['user'],
    summary: 'Get one user',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                username: { type: 'string' },
                password: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'number' },
                address: { type: 'string' },
                gender: { type: 'number' },
                thumbnail: { type: 'string' },
                roles: { type: 'string' },

                created_at: { type: 'number' },
                created_by: { type: 'number' },
                updated_at: { type: 'number' },
                updated_by: { type: 'number' },
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

module.exports = getOneUsersSchema;
