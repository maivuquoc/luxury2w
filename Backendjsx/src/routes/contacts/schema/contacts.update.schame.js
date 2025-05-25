const updateContactsSchema = {
    description: 'Update one contact',
    tags: ['contact'],
    summary: 'Update one contact',
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
        required: ['name', 'email', 'phone', 'title', 'content'],
        properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            title: { type: 'string' },
            content: { type: 'string' },
            reply_id: { type: 'number' },
            created_at: { type: 'number' },
            updated_at: { type: 'number' },
            updated_by: { type: 'number' },
            status: { type: 'number' }
        }
    },

    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                title: { type: 'string' },
                content: { type: 'string' },
                reply_id: { type: 'number' },
                created_at: { type: 'number' },
                updated_at: { type: 'number' },
                updated_by: { type: 'number' },
                status: { type: 'number' }
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

module.exports = updateContactsSchema;
