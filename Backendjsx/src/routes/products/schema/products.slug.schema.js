const slugProductSchema = {
    description: 'Get one product by slug',
    tags: ['product'],
    summary: 'Get product by slug',
    params: {
        type: 'object',
        properties: {
            slug: { type: 'string' }
        },
        required: ['slug']
    },
    response: {
        200: {
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
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            example: {
                error: 'Product not found'
            }
        }
    }
};

module.exports = slugProductSchema;
