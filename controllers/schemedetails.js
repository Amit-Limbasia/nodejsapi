const { schemedetails } = require("../models");

const getSchemeDetails = async (req, res) => {
  try {
    const getSchemeDetails = await schemedetails.findAll();
    return res.status(200).json({ sucess: "Data is here!", getSchemeDetails });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createScheme = async (req, res) => {
  try {
    const { scheme_name } = req.body;
    const oldscheme = await User.findOne({
      where: {
        [Op.or]: [{ scheme_name: scheme_name }],
      },
    });

    if (oldscheme) {
      return res
        .status(409)
        .json({ details: "Scheme Already Exist. Choose Different Name!" });
    } else {
      await schemedetails.create(req.body);
      return res.status(201).json({ status: "Scheme Created Sucessfully!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getSchemeDetails, createScheme };
