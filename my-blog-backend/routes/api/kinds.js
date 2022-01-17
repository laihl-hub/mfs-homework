const router=require('koa-router')()
// const Article=require('../../model/article')
const {sequelize}=require('../../model')
const { QueryTypes } = require('sequelize')
router.prefix('/kinds')

router.get('/',async(ctx)=>{
    // let kinds=await Article.findAll({order:[['createdAt','desc']]})
    let res=await sequelize.query("SELECT DATE_FORMAT(createdAt,'%Y-%m') as kind,COUNT(*) as count from articles GROUP BY DATE_FORMAT(articles.createdAt,'%Y-%m')",{
        type:QueryTypes.SELECT
    })
    console.log(res);
    ctx.body={code:0,msg:'请求成功',data:res}
})

module.exports=router