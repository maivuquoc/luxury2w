const getOneCategoriesSchema = {
    description: 'Get one category', 
    tags: ['category'],
    summary: 'Get one category',
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
                slug: { type: 'string' },
                thumbnail: { type: 'string' },
                description: { type: 'string' },
                parent_id: { type: 'number' },
                sort_order: { type: 'number' },

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

module.exports = getOneCategoriesSchema;
