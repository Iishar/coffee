"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      idCategory: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      size: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
