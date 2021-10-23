const { User } = require("../models");
const { Op } = require("sequelize");
const jwttoken = require("../middleware/jwttoken");
const bcrypt = require("bcrypt");

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
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
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
  // Our register logic ends here
};
module.exports = {
  dologin,
  createUser,
};
