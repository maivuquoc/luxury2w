const getAllBannersSchema = require("./banners.getall.schema");
const getOneBannersSchema = require("./banners.getone.schema");
const createBannersSchema = require("./banners.create.schema");
const updateBannersSchema = require("./banners.update.schema");
const deleteBannersSchema = require("./banners.delete.schema");
const statusBannersSchema = require("./banners.status.schema");

module.exports = {
    getAllBannersSchema,
    getOneBannersSchema,
    createBannersSchema,
    updateBannersSchema,
    deleteBannersSchema,
    statusBannersSchema
}