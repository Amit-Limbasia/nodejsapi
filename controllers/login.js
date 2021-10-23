const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwttoken = require("../middleware/jwttoken");

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
};
