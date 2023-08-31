const Joi = require("joi");

const schema = Joi.object({
  empID: Joi.number().required(),
  empName: Joi.string().required(),
  empContact: Joi.number().required(),
  empDesignation: Joi.string().required(),
  empEmail: Joi.string().required(),
});

module.exports = schema;
