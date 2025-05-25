const orderDetailSchema = require('./schema');
const orderDetailsHandler = require('../../handlers/orderdetails.handler');

module.exports = function (fastify, opts, done) {
    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ]
    // 
    fastify.get('/api/orderdetails', { schema: orderDetailSchema.getAllOrderDetailsSchema }, orderDetailsHandler.getAll);

    // 
    fastify.get('/api/orderdetails/:id', { schema: orderDetailSchema.getOneOrderDetailsSchema }, orderDetailsHandler.getOne);

    // 
    fastify.post('/api/orderdetails', {onRequest, schema: orderDetailSchema.createOrderDetailsSchema }, orderDetailsHandler.createOrderDetail);

    // 
    fastify.put('/api/orderdetails/:id', {onRequest, schema: orderDetailSchema.updateOrderDetailsSchema }, orderDetailsHandler.updateOrderDetail);

    // 
    fastify.delete('/api/orderdetails/:id', {onRequest, schema: orderDetailSchema.deleteOrderDetailsSchema }, orderDetailsHandler.deleteOrderDetail);

    //
    fastify.patch('/api/orderdetails/:id', {schema: orderDetailSchema.statusOrderDetailsSchema}, orderDetailsHandler.updateStatus);

    //
    fastify.post('/api/orderdetails/user', {schema: orderDetailSchema.createOrderDetailsUserSchema }, orderDetailsHandler.createOrderDetailUser);

    //
    fastify.get('/api/orderdetails/all-order/:order_id', {schema: orderDetailSchema.getAllOrderDetailSchema}, orderDetailsHandler.getAllOrderDetail);
    

    done();
}
