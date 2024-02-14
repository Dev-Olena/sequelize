'use strict';
const {
  Model
} = require('sequelize');
const {isBefore} = require('date-fns');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        isValidDate(value) {
          if(isBefore (new Date(), naw Date(value))) {
            throw new Error('Check your birthdate')
          }
        }
      }

    },
    gender: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    underscored: true
  });
  return User;
};