const getAllPostsSchema = {
    description: 'Get all posts',
    tags: ['post'],
    summary: 'Get all posts',
    response: {
        200: {
            type: 'array',
            items: {
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

                    created_at: { type: 'number' },
                    created_by: { type: 'number' },
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

module.exports = getAllPostsSchema;