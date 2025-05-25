const updateBrandsSchema = {
    description: 'update one brand',
    tags: ['brand'],
    summary: 'update one brand',
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
        required: ['name', 'slug', 'thumbnail', 'created_at', 'created_by'],
        properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            slug: { type: 'string' },
            thumbnail: { type: 'string' },
            description: { type: 'string' },
            sort_order: { type: 'number' },

            created_at: { type: 'number' },
            created_by: { type: 'number' },
            updated_at: { type: 'number' },
            updated_by: { type: 'number' },
            status: { type: 'number' },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                link: { type: 'string' },
                position: { type: 'string' },
                image: { type: 'string' },
                description: { type: 'string' },
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

module.exports = updateBrandsSchema;
