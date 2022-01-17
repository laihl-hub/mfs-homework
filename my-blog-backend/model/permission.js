const {DataTypes}=require('sequelize')
const {Sequelize,sequelize}=require('./base')

let Permission=sequelize.define('permission',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    path:{
        type:DataTypes.STRING,
    },
    method:{
        type:DataTypes.TEXT,
        defaultValue:''
    },
    
})

module.exports=Permission