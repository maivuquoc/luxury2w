const orderSchema = require('./schema');
const ordersHandler = require('../../handlers/orders.handler');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ]
    //
    fastify.get('/api/orders', { schema: orderSchema.getAllOrdersSchema }, ordersHandler.getAll);

    //
    fastify.get('/api/orders/:id', { schema: orderSchema.getOneOrdersSchema }, ordersHandler.getOne);

    //
    fastify.post('/api/orders', { onRequest, schema: orderSchema.createOrdersSchema }, ordersHandler.createOrder);

    //
    fastify.put('/api/orders/:id', { onRequest, schema: orderSchema.updateOrdersSchema }, ordersHandler.updateOrder);

    //
    fastify.delete('/api/orders/:id', { onRequest, schema: orderSchema.deleteOrdersSchema }, ordersHandler.deleteOrder);

    //
    fastify.patch('/api/orders/:id', { schema: orderSchema.statusOrdersSchema }, ordersHandler.updateStatus);

    //
    fastify.post('/api/orders/user', { schema: orderSchema.createOrdersUserSchema }, ordersHandler.createOrderUser);

    //
    fastify.get('/api/orders/all-user/:user_id', { schema: orderSchema.getAllOrdersUserSchema }, ordersHandler.getAllOrderUser);

    //
    fastify.delete('/api/orders/user/:id', { schema: orderSchema.deleteOrdersUserSchema }, ordersHandler.deleteOrderUser);


    done();
}
