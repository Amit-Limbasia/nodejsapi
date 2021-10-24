const Validators = require("./schema");

module.exports = function (validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      // if no error then validated body pass to next function
      next();
    } catch (err) {
      // If error then respose from here
      const { details } = err;
      const message = details.map((i) => i.message);
      return res.status(422).json({ error: message });
    }
  };
};
