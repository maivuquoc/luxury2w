const getAllTopicsSchema = require("./topics.getall.schema");
const getOneTopicsSchema = require("./topics.getone.schema");
const createTopicsSchema = require("./topics.create.schema");
const updateTopicsSchema = require("./topics.update.schema");
const deleteTopicsSchema = require("./topics.delete.schema");
const statusTopicsSchema = require("./topics.status.schema");

module.exports = {
    getAllTopicsSchema,
    getOneTopicsSchema,
    createTopicsSchema,
    updateTopicsSchema,
    deleteTopicsSchema,
    statusTopicsSchema
};
