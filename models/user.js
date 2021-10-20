module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return User;
};
