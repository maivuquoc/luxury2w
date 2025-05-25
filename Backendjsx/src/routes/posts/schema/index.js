const getAllPostsSchema = require("./posts.getall.schema");
const getOnePostsSchema = require("./posts.getone.schema");
const createPostsSchema = require("./posts.create.schema");
const updatePostsSchema = require("./posts.update.schema");
const deletePostsSchema = require("./posts.delete.schema");
const statusPostsSchema = require('./posts.status.schema');
const newPostSchema = require("./posts.new.chema");

module.exports = {
    getAllPostsSchema,
    getOnePostsSchema,
    createPostsSchema,
    updatePostsSchema,
    deletePostsSchema,
    statusPostsSchema,
    newPostSchema
}
