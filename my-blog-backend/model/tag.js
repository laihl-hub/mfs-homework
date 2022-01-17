const {DataTypes}=require('sequelize')
const {Sequelize,sequelize}=require('./base')
// const Article=require('./article')

let Tag=sequelize.define('tag',{
    name:{
        type:DataTypes.STRING,
        // unique:true
    },
    description:{
        type:DataTypes.STRING
    }
})


// Tag.sync()

module.exports=Tag