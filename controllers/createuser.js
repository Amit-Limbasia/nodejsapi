const { User } = require("../models");
const { Op } = require("sequelize");
const jwttoken = require("../middleware/jwttoken");

const createUser = async (req, res) => {
  try {
    //const { email, mobile, pannumber } = req.body;
    const olduser = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { mobile: req.body.mobile },
          { pannumber: req.body.pannumber },
        ],
      },
    });

    if (olduser) {
      const match =
        req.body.email === olduser.email
          ? "Email Already Exist. Please Login"
          : req.body.mobile === olduser.mobile
          ? "Mobile Already Exist. Please Login"
          : "PAN Number Already Exist. Please Login";
      return res.status(409).json({ details: match });
    } else {
      const user = await User.create(req.body);

      // Create token
      return res
        .status(201)
        .json({
          status: "User Created Sucessfully!",
          token: jwttoken.createtoken(user.id, user.email),
        });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createUser,
};
