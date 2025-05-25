const getAllContactsSchema = require("./contacts.getall.schema");
const getOneContactsSchema = require("./contacts.getone.schema")
const createContactsSchema = require("./contact.create.schema");
const updateContactsSchema = require("./contacts.update.schame");
const deleteContactsSchema = require('./contacts.delete.schema');
const statusContactsSchema = require('./contacts.status.schema');
const createContactsUserSchema = require("./contact.createuser.schema");


module.exports = {
    getAllContactsSchema,
    getOneContactsSchema,
    createContactsSchema,
    updateContactsSchema,
    deleteContactsSchema,
    statusContactsSchema,
    createContactsUserSchema
}