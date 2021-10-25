const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class schemedetails extends Model {}

  schemedetails.init(
    {
      scheme_name: { type: DataTypes.STRING },
      scheme_status: { defaultValue: 1, type: DataTypes.INTEGER },
      Started_on: { type: DataTypes.DATE },
      Ended_on: { allowNull: true, type: DataTypes.DATE },
      start_nav: { defaultValue: 10, type: DataTypes.DECIMAL(10, 3) },
      current_nav: { defaultValue: 10, type: DataTypes.DECIMAL(10, 3) },
      total_unit: { defaultValue: 0, type: DataTypes.DECIMAL(10, 3) },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "schemedetails", // We need to choose the model name
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return schemedetails;
};
