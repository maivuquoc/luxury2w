const getAllUsersSchema = require("./users.getall.schema");
const getOneUsersSchema = require("./users.getone.schema");
const createUsersSchema = require("./users.create.schema");
const userLoginSchema = require("./users.login.schema");
const updateUsersSchema = require("./users.update.schema");
const deleteUsersSchema = require("./users.delete.schema");
const statusUsersSchema = require("./users.status.schema");
const updatePasswordSchema = require("./users.updatepassword.schema");
const checkEmailSchema = require("./users.checkemail.schema");

module.exports = {
    getAllUsersSchema,
    getOneUsersSchema,
    createUsersSchema,
    userLoginSchema,
    updateUsersSchema,
    deleteUsersSchema,
    statusUsersSchema,
    checkEmailSchema,
    updatePasswordSchema
}