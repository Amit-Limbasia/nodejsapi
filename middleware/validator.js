//* middlewares/Validator.js
const createHttpError = require("http-errors");
//* Include joi to check error type
const Joi = require("joi");
//* Include all validators
const Validators = require("./schema");

module.exports = function (validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      console.log(req.body);
      next();
    } catch (err) {
      console.log(err);
      const { details } = err;
      const message = details.map((i) => i.message);
      res.status(422).json({ error: message });
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi)
        return next(createHttpError(422, { message: err.message }));
      next(createHttpError(500));
    }
  };
};
