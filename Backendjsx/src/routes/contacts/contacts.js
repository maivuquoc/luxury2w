const contactSchema = require('./schema');
const contactsHandler = require('../../handlers/contacts.handler');

module.exports = function(fastify, opts, done){
    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ]
    fastify.get('/api/contacts', {schema: contactSchema.getAllContactsSchema}, contactsHandler.getAll);

    //
    fastify.get('/api/contacts/:id', {schema: contactSchema.getOneContactsSchema}, contactsHandler.getOne);
    
    //
    fastify.post('/api/contacts', {onRequest, schema: contactSchema.createContactsSchema}, contactsHandler.createContact);
    
    //
    fastify.put('/api/contacts/:id', {onRequest, schema: contactSchema.updateContactsSchema}, contactsHandler.updateContact);
        
    //
    fastify.delete('/api/contacts/:id', {onRequest, schema: contactSchema.deleteContactsSchema}, contactsHandler.deleteContact);

    //
    fastify.patch('/api/contacts/:id', {schema: contactSchema.statusContactsSchema}, contactsHandler.updateStatus);

    //
    fastify.post('/api/contacts/user', { schema: contactSchema.createContactsUserSchema}, contactsHandler.createContactUser);

    done(); 
}
