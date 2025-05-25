const getAllMenusSchema = require("./menus.getall.schema");
const getOneMenusSchema = require("./menus.getone.schema");
const createMenusSchema = require("./menus.create.schema");
const updateMenusSchema = require("./menus.update.schema");
const deleteMenusSchema = require("./menus.delete.schema");

module.exports = {
    getAllMenusSchema,
    getOneMenusSchema,
    createMenusSchema,
    updateMenusSchema,
    deleteMenusSchema
};
