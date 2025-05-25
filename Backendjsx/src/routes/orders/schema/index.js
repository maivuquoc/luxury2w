const getAllOrdersSchema = require("./orders.getall.schema");
const getOneOrdersSchema = require("./orders.getone.schema");
const createOrdersSchema = require("./orders.create.schema");
const updateOrdersSchema = require("./orders.update.schema");
const deleteOrdersSchema = require('./orders.delete.schema');
const statusOrdersSchema = require("./orders.status.schema");
const createOrdersUserSchema = require("./orders.createuser.schema");
const getAllOrdersUserSchema = require("./orders.allorderuser.schema");
const deleteOrdersUserSchema = require("./orders.deleteuser.schema");

module.exports = {
    getAllOrdersSchema,
    getOneOrdersSchema,
    createOrdersSchema,
    updateOrdersSchema,
    deleteOrdersSchema,
    statusOrdersSchema,
    createOrdersUserSchema,
    getAllOrdersUserSchema,
    deleteOrdersUserSchema,
}
