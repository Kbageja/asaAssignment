const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'Lifelinkr@123', {
    host: 'localhost',
  port: 3307,
  dialect: 'mysql'
});

module.exports = sequelize;
