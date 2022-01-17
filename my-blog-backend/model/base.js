const { Sequelize } = require('sequelize');
module.exports = {Sequelize,sequelize:new Sequelize('my_blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' ,
    // pool:{
    //     max:5,
    //     min:0,
    //     idle:10000
    // }
  })};