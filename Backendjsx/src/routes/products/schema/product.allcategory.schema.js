const getAllCategoryProductSchema = {
    description: 'Get all products by category_id',
    tags: ['product'],
    summary: 'Get all products filtered by category_id',
    params: {
        type: 'object',
        properties: {
            category_id: { type: 'number', description: 'Category ID to filter products' }
        },
        required: ['category_id']
    },
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
                message: 'Invalid category_id parameter'
            }
        }
    }
};

module.exports = getAllCategoryProductSchema;
