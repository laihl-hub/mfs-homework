const {DataTypes}=require('sequelize')
const {Sequelize,sequelize}=require('./base')

// const User=require('./user')
// const Tag=require('./tag')
// const Tagging=require('./tagging')

let Article=sequelize.define('article',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    // tag:{
    //     type:DataTypes.CHAR,
    //     allowNull:false
    // },
    viewTimes:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    intro:{
        type:DataTypes.TEXT,
        defaultValue:''
    },
    del:{
        type:DataTypes.TEXT,
        defaultValue:''
    },
    // author:{
    //     type:DataTypes.INTEGER,
    //     references:{
    //         model:User,
    //         key:'id'
    //     }
    // }
})
// User.hasMany(Article)
// Article.belongsTo(User)

// Article.belongsToMany(Tag,{through:Tagging})
// Tag.belongsToMany(Article,{through:Tagging})

// User.sync()
// Tagging.sync()
// Article.sync()
// Tag.sync()


module.exports=Article