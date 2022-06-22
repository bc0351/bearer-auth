'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { modelInterface } = require('./modelInterface');
const userSchema = require('./user.schema');

const DATABASE_URL = process.env.NODE_URL === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL); 
const UsersModel = userSchema(sequelize, DataTypes);

module.exports = {
  sequelize,
  userInterface: new modelInterface(UsersModel),
};
