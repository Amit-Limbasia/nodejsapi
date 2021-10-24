const { User } = require("../models");

const userdetail = async (req, res) => {
  const { user_id } = req.user;
  try {
    const userdata = await User.findOne({
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
      where: { id: user_id },
    });
    return res.status(200).json({ details: userdata });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateuserdetails = async (req, res) => {
  const { user_id } = req.user;
  const { fname, mname, lname, upi_payment_id } = req.body;
  try {
    await User.update(
      {
        fname: fname,
        mname: mname,
        lname: lname,
        upi_payment_id: upi_payment_id,
      },
      {
        where: { id: user_id },
        individualHooks: true, //It required to update time of UpdatedAt
      }
    );
    return res.status(201).json({ message: "Details Updated Successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userdetail,
  updateuserdetails,
};
