const getCategoryProductSchema = {
    description: 'Get products by category',
    tags: ['product'],
    summary: 'Get a list of products by category ID',
    params: {
        type: 'object',
        properties: {
            category_id: { type: 'string' } // category_id phải là chuỗi
        }
    },
    querystring: {
        type: 'object',
        properties: {
            limit: { type: 'number', default: 4 } // Số lượng sản phẩm muốn lấy, mặc định là 4
        }
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
                message: 'Invalid category ID or query parameters'
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
                error: 'Not found',
                message: 'No products found in this category'
            }
        }
    }
};

module.exports = getCategoryProductSchema;