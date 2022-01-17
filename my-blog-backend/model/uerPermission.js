const {DataTypes}=require('sequelize')
const {Sequelize,sequelize}=require('./base')
// const Tag = require('./tag')

const UserPermission=sequelize.define('userPermission',{})

module.exports=UserPermission