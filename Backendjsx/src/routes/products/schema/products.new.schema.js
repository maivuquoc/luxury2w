const newProductSchema = {
    description: 'Get a new product',
    tags: ['product'],
    summary: 'Get a new product',
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    category_id: { type: 'number' },
                    brand_id: { type: 'number' },
                    name: { type: 'string' },
                    slug: { type: 'string' },
                    thumbnail: { type: 'string' },
                    description: { type: 'string' },
                    content: { type: 'string' },
                    pricebuy: { type: 'number' },
                    pricesale: { type: 'number' },
                    qty: { type: 'number' },

                    created_at: { type: 'number' },
                    created_by: { type: 'number' },
                    updated_at: { type: 'number' },
                    updated_by: { type: 'number' },
                    status: { type: 'number' }
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
};

module.exports = newProductSchema;
