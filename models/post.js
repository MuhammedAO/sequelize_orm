'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({User}) {
      // define association here
      //if you don't provide a foreign key, sequelize will look for 
      //the name of the model + primary key which is Id
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'} )
    }

    toJSON(){
      return {...this.get(), id: undefined, userId: undefined}
    }
  };
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};