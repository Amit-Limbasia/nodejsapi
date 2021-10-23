const { User } = require("../models");

const userdetail = async (req, res) => {
  try {
    // console.log(req.user);
    const { user_id } = req.user;
    const userdata = await User.findOne(
      {
        attributes: [
          ["fname", "First Name"],
          ["mname", "Middle Name"],
          ["lname", "Last Name"],
          "email",
          "mobile",
          "pannumber",
          "upi_payment_id",
          "upi_status",
          "user_status",
        ],
      },
      {
        where: { id: user_id },
      }
    );
    // Create token
    return res.status(201).json({ details: userdata });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  userdetail,
};
