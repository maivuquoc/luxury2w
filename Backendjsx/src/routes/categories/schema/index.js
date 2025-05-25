const getAllCategoriesSchema = require("./categories.getall.schema");
const getOneCategoriesSchema = require("./categories.getone.schema");
const createCategoriesSchema = require("./categories.create.schema");
const updateCategoriesSchema = require("./categories.update.schema");
const deleteCategoriesSchema = require("./categories.delete.schema");
const statusCategoriesSchema = require("./categories.status.schema");


module.exports = {
    getAllCategoriesSchema,
    getOneCategoriesSchema,
    createCategoriesSchema,
    updateCategoriesSchema,
    deleteCategoriesSchema,
    statusCategoriesSchema
}