const menuSchema = require('./schema');
const menusHandler = require('../../handlers/menus.handler');

module.exports = function(fastify, opts, done){
    fastify.get('/api/menus', {schema: menuSchema.getAllMenusSchema}, menusHandler.getAll);

    //
    fastify.get('/api/menus/:id', { schema: menuSchema.getOneMenusSchema }, menusHandler.getOne);

    //
    fastify.post('/api/menus', { schema: menuSchema.createMenusSchema }, menusHandler.createMenu);

    //
    fastify.put('/api/menus/:id', { schema: menuSchema.updateMenusSchema }, menusHandler.updateMenu);

    //
    fastify.delete('/api/menus/:id', { schema: menuSchema.deleteMenusSchema }, menusHandler.deleteMenu);

    done();
}
