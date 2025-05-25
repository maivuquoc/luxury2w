const getOneProductsSchema = require("./products.getone.schema");
const getAllProductsSchema = require("./products.getall.schema");
const createProductsSchema = require("./products.create.schema");
const updateProductsSchema = require("./products.update.schema");
const deleteProductsSchema = require("./products.delete.schema");
const statusProductsSchema = require("./products.status.schema");
const newProductSchema = require("./products.new.schema");
const saleProductSchema = require("./products.sale.schema");
const slugProductSchema = require("./products.slug.schema");
const getCategoryProductSchema = require("./products.category.schema");
const getAllCategoryProductSchema = require("./product.allcategory.schema");
const getAllBrandProductSchema = require("./products.allbrand.schema");

module.exports = {
    // getAllProductsSchema: require('./products.getall.schema'),
    getAllProductsSchema,
    getOneProductsSchema,
    createProductsSchema,
    updateProductsSchema,
    deleteProductsSchema,
    statusProductsSchema,
    newProductSchema,
    saleProductSchema,
    slugProductSchema,
    getCategoryProductSchema,
    getAllCategoryProductSchema,
    getAllBrandProductSchema


}