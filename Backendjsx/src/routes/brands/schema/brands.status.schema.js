const statusBrandsSchema = {
    description: 'Update status of a brand',
    tags: ['brand'],
    summary: 'Update status',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            status: { type: 'number' }
        },
        required: ['status']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            },
            example: {
                message: 'Status updated successfully'
            }
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            example: {
                error: 'Brand not found'
            }
        },
        500: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            example: {
                error: 'Internal Server Error'
            }
        }
    }
};

module.exports = statusBrandsSchema;
