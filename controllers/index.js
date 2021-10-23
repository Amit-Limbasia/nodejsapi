const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    // const users = await User.findAll({
    //   attributes: [["fname", "First Name"], ["lname", "Last Name"], "email"],
    // });
    const users = await User.findAll();
    return res.status(200).json({ sucess: "Data is here!", users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id },
      individualHooks: true,
    });

    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  updateUser,
};
