const {DataTypes}=require('sequelize')
const {Sequelize,sequelize}=require('./base')
// const Tag = require('./tag')

const Tagging=sequelize.define('tagging',{})

module.exports=Tagging