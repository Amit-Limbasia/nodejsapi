const Joi = require("joi");

let allschema = {
  fname: Joi.string().min(3).max(10).required(),
  mname: Joi.string().min(3).max(10).required(),
  lname: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `mobile must have 10 digits.` })
    .required(),
  pannumber: Joi.string()
    .length(10)
    .uppercase()
    .pattern(new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"))
    .messages({ "string.pattern.base": `Pannumber Should be like ABCDE1234J.` })
    .required(),
  password: Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  birthdate: Joi.date()
    .less(Date.now() - 24 * 60 * 60 * 1000)
    .required(),
  upi_payment_id: [
    Joi.string().allow(null).email().optional(),
    Joi.allow(null),
  ],
};
let schemaoption = {
  abortEarly: false, // include all errors
};

const login = Joi.object({
  email: allschema.email,
  password: allschema.password,
}).options(schemaoption);

const updateuser = Joi.object({
  fname: allschema.fname,
  mname: allschema.mname,
  lname: allschema.lname,
  upi_payment_id: allschema.upi_payment_id,
})
  .min(1)
  .options(schemaoption);

const createuser = Joi.object(allschema).options(schemaoption);
module.exports = { createuser, updateuser, login };
