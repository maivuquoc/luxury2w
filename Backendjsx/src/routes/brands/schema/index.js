const getAllBrandsSchema = require("./brands.getall.schema");
const getOneBrandsSchema = require("./brands.getone.schema");
const createBrandsSchema = require("./brands.create.schema");
const updateBrandsSchema = require("./brands.update.schema");
const deleteBrandsSchema = require("./brands.delete.schema");
const statusBrandsSchema = require("./brands.status.schema");

module.exports = {
    getAllBrandsSchema, 
    getOneBrandsSchema,
    createBrandsSchema,
    updateBrandsSchema,
    deleteBrandsSchema,
    statusBrandsSchema

}