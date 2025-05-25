const brandSchema = require('./schema');
const brandsHandler = require('../../handlers/brands.handler');

module.exports = function(fastify, opts, done){

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ]

    fastify.get('/api/brands', {schema: brandSchema.getAllBrandsSchema}, brandsHandler.getAll);

    //
    fastify.get('/api/brands/:id', {schema: brandSchema.getOneBrandsSchema}, brandsHandler.getOne);

    //
    fastify.post('/api/brands', {onRequest, schema: brandSchema.createBrandsSchema}, brandsHandler.createBrand);

    //
    fastify.put('/api/brands/:id', {onRequest, schema: brandSchema.updateBrandsSchema}, brandsHandler.updateBrand);

    //
    fastify.delete('/api/brands/:id', {onRequest, schema: brandSchema.deleteBrandsSchema}, brandsHandler.deleteBrand);

    //
    fastify.patch('/api/brands/:id', {schema: brandSchema.statusBrandsSchema}, brandsHandler.updateStatus);

    
    done();
}
