// Require the framework and instantiate it


// CommonJs
const fastify = require('fastify')({
  logger: true
})

const mysqlConnerction = require('./configs/connection');
mysqlConnerction(fastify)


require('dotenv').config();




//////////swagger/////////

fastify.register(require('@fastify/swagger'), {
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'http://swagger.io',
            description: 'Find more info here'
        },
        hosts: ['localhost:3000'],
        basePath: '/',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [],
        definitions: {},
        securityDefinitions: {}
    }
})


fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject},
    transformSpecificationClone: true
})


var path = require('path');
global.appRoot = path.resolve(__dirname);

fastify.register(require('@fastify/static'),{
  root: path.join(__dirname, 'uploads'),
  prefix: '/public/'
})

///////////////////CORS////////////////
fastify.register(require('@fastify/cors'), {
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

///////////////UPLOAD FILE///////////
fastify.register(require('@fastify/multipart'));

const jwt = require('jsonwebtoken');
fastify.decorate("authenticate", async function(request, reply){
  const authorization = request.headers?.authorization;
  if(!authorization){
    reply.code(401).send("Unauthorized");
    return;
  }

  const token = authorization.split(" ")[1];
  if(!token){
    reply.code(401).send("Unauthorized");
    return;
  }
  try {
    const secretkey = process.env.JWT_SECRET_KEY;
    request.user = jwt.verify(token, secretkey);
  } catch (err) {
    reply.code(401).send("Unauthorized");
    return;
  }
})


// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

//import categories route
fastify.register(require('./routes/categories/categories'));
//import products route
fastify.register(require('./routes/products/products'));
//import banners route
fastify.register(require('./routes/banners/banners'));
//import brands route
fastify.register(require('./routes/brands/brands'));
//import contacts route
fastify.register(require('./routes/contacts/contacts'));
//import menus route
fastify.register(require('./routes/menus/menus'));
//import orders route
fastify.register(require('./routes/orders/orders'));
//import users route
fastify.register(require('./routes/users/users'));
//import users route
fastify.register(require('./routes/posts/posts'));
//import orderdetail route
fastify.register(require('./routes/orderdetails/orderdetails'));
//import topic route
fastify.register(require('./routes/topics/topics'))

//import upload 
fastify.register(require('./routes/upload/upload'));

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})