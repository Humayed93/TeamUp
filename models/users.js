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
    twitter: {
      type: DataType.STRING
    },
    facebook: {
      type: DataType.STRING
    },
    linkedin: {
      type: DataType.STRING
    },
    states: {
      type: DataType.ENUM,
      values: ['ACTIVE', 'PENDING', 'REJECTED'],
      defaultValue: 'PENDING'
    },
    token: {
      type: DataType.STRING
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
        Users.belongsToMany(models.Projects, {through: 'Members'});
        Users.hasMany(models.Projects, {foreignKey: 'owner_id'});
      },
      isPassword: (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
      }
    }
  });
  return Users;
};
