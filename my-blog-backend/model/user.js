// const { REAL } = require('sequelize')
const {DataTypes}=require('sequelize')
const {Sequelize,sequelize}=require('./base')
// const Article=require('./article')

let User=sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.CHAR,
        allowNull:false,
        // unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING
    }
})

// User.sync()

module.exports=User