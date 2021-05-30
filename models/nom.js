"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Nom.init(
    {
      number: DataTypes.FLOAT,
      squared: DataTypes.FLOAT,
      cubed: DataTypes.FLOAT,
      prime: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Nom",
      hooks: {
        beforeSave: async (instance) => {
          instance.squared = instance.number ** 2;
          instance.cubed = instance.number ** 3;
          function isPrime(value) {
            for (var i = 2; i < value; i++) {
              if (value % i === 0) {
                return false;
              }
            }
            return value > 1;
          }
          instance.prime = isPrime(instance.number);
        }
      }
    }
  );
  return Nom;
};
