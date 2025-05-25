const userSchema = require('./schema');
const usersHandler = require('../../handlers/users.handler');

module.exports = function (fastify, opts, done) {
    //Xem tất cả user
    fastify.get('/api/users', { schema: userSchema.getAllUsersSchema }, usersHandler.getAll);

    //Xem 1 user
    fastify.get('/api/users/:id', { schema: userSchema.getOneUsersSchema }, usersHandler.getOne);

    //Đăng kí
    fastify.post('/api/users', { schema: userSchema.createUsersSchema }, usersHandler.createUser);

    //Đăng nhập
    fastify.post('/api/users/login', { schema: userSchema.userLoginSchema }, usersHandler.login);

    //sửa 1 user
    fastify.put('/api/users/:id', { schema: userSchema.updateUsersSchema }, usersHandler.updateUser);

    //xoá 1 user
    fastify.delete('/api/users/:id', { schema: userSchema.deleteUsersSchema }, usersHandler.deleteUser);

    //
    fastify.patch('/api/users/:id', { schema: userSchema.statusUsersSchema }, usersHandler.updateStatus);

    //
    fastify.patch('/api/users/update-password', { schema: userSchema.updatePasswordSchema }, usersHandler.updatePassword);
    
    //
    fastify.post('/api/users/check-email', { schema: userSchema.checkEmailSchema }, usersHandler.checkEmail);

    done();
}
