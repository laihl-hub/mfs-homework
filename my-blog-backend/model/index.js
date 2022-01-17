const User=require('./user')
const Article=require('./article')
const Tag=require('./tag')
const Tagging=require('./tagging')
const Permission=require('./permission')
const UserPermission=require('./uerPermission')
const {Sequelize,sequelize}=require('./base')



User.hasMany(Article)
Article.belongsTo(User)

Article.belongsToMany(Tag,{through:Tagging})
Tag.belongsToMany(Article,{through:Tagging})

Permission.belongsToMany(User,{through:UserPermission})
User.belongsToMany(Permission,{through:UserPermission})

User.sync()
Permission.sync()
UserPermission.sync()
Tagging.sync()
Article.sync()
Tag.sync()

module.exports={User,Article,Tag,Tagging,Permission,UserPermission,Sequelize,sequelize}