const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      fname: { type: DataTypes.STRING },
      mname: { type: DataTypes.STRING },
      lname: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      mobile: { type: DataTypes.BIGINT },
      pannumber: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      birthdate: { type: DataTypes.DATE },
      upi_payment_id: { type: DataTypes.STRING },
      upi_status: { defaultValue: 0, type: DataTypes.INTEGER },
      user_status: { defaultValue: 0, type: DataTypes.INTEGER },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      hooks: {
        afterValidate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
      instanceMethods: {
        validPassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        },
      },
    }
  );

  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };
  return User;
};

/* Old code
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fname: { type: DataTypes.STRING },
      mname: { type: DataTypes.STRING },
      lname: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      mobile: { type: DataTypes.BIGINT },
      pannumber: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      birthdate: { type: DataTypes.DATE },
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
};*/
