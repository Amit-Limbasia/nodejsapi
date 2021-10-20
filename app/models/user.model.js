module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      fname: {
        type: Sequelize.STRING(11),
      },
      mname: {
        type: Sequelize.STRING(11),
      },
      lname: {
        type: Sequelize.STRING(11),
      },
      email: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.INTEGER(10),
      },
      pannumber: {
        type: Sequelize.STRING(10),
      },
      birthdate: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.TIME,
      },
      updated_at: {
        type: Sequelize.TIME,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
