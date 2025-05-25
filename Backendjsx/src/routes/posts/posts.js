const postSchema = require('./schema');
const postsHandler = require('../../handlers/posts.handler');

module.exports = function(fastify, opts, done){
    fastify.get('/api/posts', {schema: postSchema.getAllPostsSchema}, postsHandler.getAll);

    //
    fastify.get('/api/posts/:id', { schema: postSchema.getOnePostsSchema }, postsHandler.getOne);
    
    //
    fastify.post('/api/posts', { schema: postSchema.createPostsSchema }, postsHandler.createPost);
    
    //
    fastify.put('/api/posts/:id', { schema: postSchema.updatePostsSchema }, postsHandler.updatePost);
    
    //
    fastify.delete('/api/posts/:id', { schema: postSchema.deletePostsSchema }, postsHandler.deletePost);

    //
    fastify.patch('/api/posts/:id', {schema: postSchema.statusPostsSchema}, postsHandler.updateStatus);

    // Lấy bài viết mới nhất
    fastify.get('/api/posts/new', { schema: postSchema.newPostSchema }, postsHandler.newPost);


    done();
}
