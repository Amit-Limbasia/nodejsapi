const Joi = require("joi");

const updateuserschema = Joi.object({
  fname: Joi.string().min(3).max(10),
  mname: Joi.string().min(3).max(10),
  lname: Joi.string().min(3).max(10),
  upi_payment_status: Joi.string().email(),
})
  .min(1)
  .options({
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  });

const createuserschema = Joi.object({
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
}).options({
  abortEarly: false, // include all errors
  allowUnknown: false, // ignore unknown props
  stripUnknown: true, // remove unknown props
});
module.exports = { createuserschema, updateuserschema };
