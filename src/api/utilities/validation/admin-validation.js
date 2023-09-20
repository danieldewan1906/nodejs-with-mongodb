const Joi = require("joi");

const createNewMahasiswa = Joi.object({
    nim: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().optional(),
    middleName: Joi.string().optional().allow(null),
    lastName: Joi.string().optional(),
    address: Joi.string().optional(),
    phoneNumber: Joi.string().optional()
})

const loginAdminSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    createNewMahasiswa,
    loginAdminSchema
}