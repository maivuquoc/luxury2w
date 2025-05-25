const topicSchema = require('./schema');
const topicsHandler = require('../../handlers/topics.handler');

module.exports = function(fastify, opts, done) {
    //
    fastify.get('/api/topics', { schema: topicSchema.getAllTopicsSchema }, topicsHandler.getAll);

    //
    fastify.get('/api/topics/:id', { schema: topicSchema.getOneTopicsSchema }, topicsHandler.getOne);

    //
    fastify.post('/api/topics', { schema: topicSchema.createTopicsSchema }, topicsHandler.createTopic);

    //
    fastify.put('/api/topics/:id', { schema: topicSchema.updateTopicsSchema }, topicsHandler.updateTopic);

    //
    fastify.delete('/api/topics/:id', { schema: topicSchema.deleteTopicsSchema }, topicsHandler.deleteTopic);

    //
    fastify.patch('/api/topics/:id', {schema: topicSchema.statusTopicsSchema}, topicsHandler.updateStatus);


    done();
}
