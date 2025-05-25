const getAllContactsSchema = {
    description: 'Get all contacts',
    tags: ['contact'],
    summary: 'Get all contacts',
    response: {
        200: {
            type: 'array',
            items: {
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
}

module.exports = getAllContactsSchema;