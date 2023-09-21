const Joi = require("joi")

const loginMahasiswaSchema = Joi.object({
    nim: Joi.string().required(),
    password: Joi.string().required()
})

const updateBiodataSchema = Joi.object({
    firstName: Joi.string().optional(),
    middleName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    address: Joi.string().optional(),
    phoneNumber: Joi.string().optional()
})

const nimSchema = Joi.string().required()

module.exports = {
    loginMahasiswaSchema,
    updateBiodataSchema,
    nimSchema
}