const bannerSchema = require('./schema');
const bannersHandler = require('../../handlers/banners.handler');

module.exports = function(fastify, opts, done){
    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ]
    fastify.get('/api/banners', {schema: bannerSchema.getAllBannersSchema}, bannersHandler.getAll);

    //
    fastify.get('/api/banners/:id', {schema: bannerSchema.getOneBannersSchema}, bannersHandler.getOne);

    //
    fastify.post('/api/banners', {onRequest, schema: bannerSchema.createBannersSchema}, bannersHandler.createBanner);

    //
    fastify.put('/api/banners/:id', {onRequest, schema: bannerSchema.updateBannersSchema}, bannersHandler.updateBanner);
    
    //
    fastify.delete('/api/banners/:id', {onRequest, schema: bannerSchema.deleteBannersSchema}, bannersHandler.deleteBanner);
    
    //
    fastify.patch('/api/banners/:id', {schema: bannerSchema.statusBannersSchema}, bannersHandler.updateStatus);


    done();
}
