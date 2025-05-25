const getAllProductsSchema = {
    //   description: 'Get all products with pagination',
    //   tags: ['product'],
    //   summary: 'Retrieve a paginated list of products',

    //   querystring: {
    //     type: 'object',
    //     properties: {
    //       page: { type: 'string', default: '1', description: 'Page number of the pagination' },
    //       limit: { type: 'string', default: '10', description: 'Number of items per page' },
    //     }
    //   },

    //   response: {
    //     200: {
    //       type: 'object',
    //       properties: {
    //         data: {
    //           type: 'array',
    //           items: {
    //             type: 'object',
    //             properties: {
    //               id: { type: 'number' },
    //               attributes: {
    //                 type: 'object',
    //                 properties: {
    //                   category_id: { type: 'number' },
    //                   brand_id: { type: 'number' },
    //                   name: { type: 'string' },
    //                   slug: { type: 'string' },
    //                   thumbnail: { type: 'string' },
    //                   description: { type: 'string' },
    //                   content: { type: 'string' },
    //                   pricebuy: { type: 'number' },
    //                   pricesale: { type: 'number' },
    //                   qty: { type: 'number' },

    //                   created_at: { type: 'number' },
    //                   created_by: { type: 'number' },
    //                   updated_at: { type: 'number' },
    //                   updated_by: { type: 'number' },
    //                   status: { type: 'number' }
    //                 }
    //               }
    //             }
    //           }
    //         },
    //         meta: {
    //           type: 'object',
    //           properties: {
    //             pagination: {
    //               type: 'object',
    //               properties: {
    //                 page: { type: 'number' },
    //                 pageSize: { type: 'number' },
    //                 pageCount: { type: 'number' },
    //                 total: { type: 'number' }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // };
    description: 'Get all products',
    tags: ['product'],
    summary: 'Get all products',
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
module.exports = getAllProductsSchema;
