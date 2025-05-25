const createUsersSchema = {
    description: 'Create a new user',
    tags: ['user'],
    summary: 'Create a new user',
    body: {
        type: 'object',
        required: ['name', 'username', 'password', 'email', 'phone', 'address', 'gender', 'created_at', 'created_by'],
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

module.exports = createUsersSchema;