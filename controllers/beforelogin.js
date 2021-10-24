const { User } = require("../models");
const { Op } = require("sequelize");
const jwttoken = require("../middleware/jwttoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { email, mobile, pannumber } = req.body;
    const olduser = await User.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { mobile: mobile },
          { pannumber: pannumber },
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
      return res.status(201).json({
        status: "User Created Sucessfully!",
        token: jwttoken.createtoken(user.id, user.email),
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const dologin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        // Create token
        return res
          .status(200)
          .json({ token: jwttoken.createtoken(user.id, user.email) });
      }
      return res.status(400).send("Invalid Credentials");
    }
    return res.status(200).json({ message: "User Not Exist" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  dologin,
  createUser,
};
