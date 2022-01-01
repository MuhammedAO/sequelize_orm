'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.hasMany(Post, {foreignKey: 'userId', as: 'posts'})
    }
    toJSON(){
      return {...this.get(), id: undefined}
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Field cannot be null'},
        notEmpty: {msg: 'Field cannot be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Field cannot be null'},
        notEmpty: {msg: 'Field cannot be empty'},
        isEmail: {msg: 'Must be a valid email'}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Field cannot be null'},
        notEmpty: {msg: 'Field cannot be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};