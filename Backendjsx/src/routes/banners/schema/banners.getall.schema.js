const getAllBannersSchema = {
    description: 'Get all banners',
    tags: ['banner'],
    summary: 'Get all banners',
    response:{
        200:{
            type:'array',
            items:{
                type: 'object',
                properties:{
                    id:{type: 'number'},
                    name:{type: 'string'},
                    link: {type: 'string'},
                    position: {type: 'string'},
                    image: {type: 'string'},
                    description: {type: 'string'},
                    sort_order: {type: 'number'},

                    created_at: {type: 'number'},
                    created_by: {type: 'number'},
                    updated_at: {type: 'number'},
                    updated_by: {type: 'number'},
                    status: {type: 'number'},
                }
            }
        },
        400: {
            type: 'object',
            properties: {
                statusCode:{type: 'number'},
                error:{type: 'string'},
                message:{type: 'string'}
            },
            example: {
                statusCode: 400,
                error: 'Bad request',
                message: 'Invalid query parameters'
            }

        }
    }
}

module.exports = getAllBannersSchema;