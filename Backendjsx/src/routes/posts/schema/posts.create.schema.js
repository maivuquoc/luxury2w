const createPostsSchema = {
    description: 'Create a new post',
    tags: ['post'],
    summary: 'Create a new post',
    body: {
        type: 'object',
        required: ['title', 'slug', 'content', 'created_at', 'created_by'],
        properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            slug: { type: 'string' },
            content: { type: 'string' },
            description: { type: 'string' },
            thumbnail: { type: 'string' },
            type: { type: 'string' },
            topic_id: { type: 'number' },
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
              title: { type: 'string' },
              slug: { type: 'string' },
              thumbnail: { type: 'string' },
              description: { type: 'string' },
              type: { type: 'string' },
              content: { type: 'string' },
              topic_id: { type: 'number' },
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
        },

        403: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 403,
                error: 'Forbidden',
                message: 'Access denied'
            }
        },

        404: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 404,
                error: 'Not Found',
                message: 'Resource not found'
            }
        },

        500: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Something went wrong'
            }
        }
    }
}

module.exports = createPostsSchema;
