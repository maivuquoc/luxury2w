const mysql = require('@fastify/mysql');

const mysqlConnerction = (fastify) => {
    fastify.register(mysql, {
        connectionString: 'mysql://root@localhost/fastify'
    });
}

module.exports = mysqlConnerction;