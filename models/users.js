//import bcrypt from "bcrypt";
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING
    },
    password: {
      type: DataType.STRING
    },
    email: {
      type: DataType.STRING,
      unique: true
    },
    bio: {
      type: DataType.TEXT
    },
    phone: {
      type: DataType.INTEGER
    },
    major: {
      type: DataType.STRING
    },
    website: {
      type: DataType.STRING
    },
    states: {
      type: DataType.ENUM,
      values: ['ACTIVE', 'PENDING', 'REJECTED'],
      defaultValue: 'PENDING'
    }
  }, {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: models => {
        Users.hasMany(models.Projects, {foreignKey: 'owner_id'});
        Users.belongsToMany(models.Skills, {through: 'UserSkills', foreignKey: 'user_id'});
        Users.belongsToMany(models.Invitations, {through: 'UserInvitations', foreignKey: 'user_id'});
        Users.hasMany(models.Members, {foreignKey: 'user_id'});
      },
      isPassword: (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
      }
    }
  });
  return Users;
};
