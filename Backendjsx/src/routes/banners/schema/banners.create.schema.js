const createBannersSchema = {
    description: 'Create a new banner',
    tags: ['banner'],
    summary: 'Create a new banner',
    headers: {
        type: 'object',
        properties: {
            Authorization: { type: 'string' },
        },
        required: ['Authorization']
    }, 
    body: {
        type: 'object',
        required: ['name', 'position', 'image', 'created_at', 'created_by'],
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

        //
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
        },

    }
}

module.exports = createBannersSchema;