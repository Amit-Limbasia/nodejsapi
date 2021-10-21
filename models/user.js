const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fname: { allowNull: false, type: DataTypes.STRING },
      mname: { allowNull: false, type: DataTypes.STRING },
      lname: { allowNull: false, type: DataTypes.STRING },
      email: { allowNull: false, type: DataTypes.STRING },
      mobile: { allowNull: false, type: DataTypes.BIGINT },
      pannumber: { allowNull: false, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING },
      birthdate: { allowNull: false, type: DataTypes.DATE },
      upi_payment_id: { type: DataTypes.STRING },
      upi_status: { defaultValue: 0, type: DataTypes.INTEGER },
      user_status: { defaultValue: 0, type: DataTypes.INTEGER },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
