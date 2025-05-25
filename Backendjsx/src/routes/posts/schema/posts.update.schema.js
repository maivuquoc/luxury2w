const updatePostsSchema = {
    description: 'Update one post',
    tags: ['post'],
    summary: 'Update one post',
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        required: ['title', 'content', 'topic_id', 'updated_at', 'updated_by'],
        properties: {
            id: { type: 'number' },
            topic_id: { type: 'number' },
            title: { type: 'string' },
            slug: { type: 'string' },
            thumbnail: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },
            content: { type: 'string' },
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
                topic_id: { type: 'number' },
                title: { type: 'string' },
                slug: { type: 'string' },
                thumbnail: { type: 'string' },
                description: { type: 'string' },
                type: { type: 'string' },
                content: { type: 'string' },
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

module.exports = updatePostsSchema;
