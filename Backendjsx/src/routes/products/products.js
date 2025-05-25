const productSchema = require('./schema');
const productsHandler = require('../../handlers/products.handler');

module.exports = function(fastify, opts, done){
    // fastify.get('/api/products', {schema: productSchema.getAllProductsSchema}, productsHandler.getAll);

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ]

    //
    fastify.get('/api/products', {schema: productSchema.getAllProductsSchema}, productsHandler.getAll);

    //
    fastify.get('/api/products/:id', {schema: productSchema.getOneProductsSchema}, productsHandler.getOne);

    //
    fastify.post('/api/products', {onRequest, schema: productSchema.createProductsSchema}, productsHandler.createProduct);
    
    //
    fastify.put('/api/products/:id', {onRequest, schema: productSchema.updateProductsSchema}, productsHandler.updateProduct);

    //
    fastify.delete('/api/products/:id', {onRequest, schema: productSchema.deleteProductsSchema}, productsHandler.deleteProduct);

    //
    fastify.patch('/api/products/:id', {schema: productSchema.statusProductsSchema}, productsHandler.updateStatus);

    // Lấy sản phẩm mới nhất
    fastify.get('/api/products/new', { schema: productSchema.newProductSchema }, productsHandler.newProduct);

    //Lấy sản phẩm giảm giá
    fastify.get('/api/products/sale', { schema: productSchema.saleProductSchema }, productsHandler.saleProduct);

    // Lấy sản phẩm theo slug
    fastify.get('/api/products/slug/:slug', { schema: productSchema.slugProductSchema }, productsHandler.slugProduct);

    // Lấy sản phẩm cùng loại
    fastify.get('/api/products/category/:category_id', { schema: productSchema.getCategoryProductSchema }, productsHandler.getCategoryProduct);

    //Lấy tất cả sản phẩm theo category
    fastify.get('/api/products/all-category/:category_id', {schema: productSchema.getAllCategoryProductSchema}, productsHandler.getAllCategoryProduct);

    //Lấy tất cả sản phẩm theo brand
    fastify.get('/api/products/all-brand/:brand_id', {schema: productSchema.getAllBrandProductSchema}, productsHandler.getAllBrandProduct);

    done();
}
