const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
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
};*/
