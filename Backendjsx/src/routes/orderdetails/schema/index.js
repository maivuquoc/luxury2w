const getAllOrderDetailsSchema = require("./orderdetails.getall.schema");
const getOneOrderDetailsSchema = require("./orderdetails.getone.schema");
const createOrderDetailsSchema = require("./orderdetails.create.schema");
const updateOrderDetailsSchema = require("./orderdetails.update.schema");
const deleteOrderDetailsSchema = require("./orderdetails.detele.schema");
const statusOrderDetailsSchema = require("./orderdetails.status.schema");
const createOrderDetailsUserSchema = require("./orderdetails.createuser.schema");
const getAllOrderDetailSchema = require("./orderdetails.getallorder.schema");

module.exports = {
    getAllOrderDetailsSchema,
    getOneOrderDetailsSchema,
    createOrderDetailsSchema,
    updateOrderDetailsSchema,
    deleteOrderDetailsSchema,
    statusOrderDetailsSchema, 
    createOrderDetailsUserSchema,
    getAllOrderDetailSchema
}
