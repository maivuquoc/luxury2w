const statusUsersSchema = {
    description: 'Update status of a user',
    tags: ['user'],
    summary: 'Update status',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            status: { type: 'number' }
        },
        required: ['status']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            },
            example: {
                message: 'Status updated successfully'
            }
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            example: {
                error: 'User not found'
            }
        },
        500: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            example: {
                error: 'Internal Server Error'
            }
        }
    }
};

module.exports = statusUsersSchema;
