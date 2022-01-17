const router=require('koa-router')()
const {Article}=require('../../model')
router.prefix('/latest-article')

router.get('/',async(ctx)=>{
    let latestArticles=await Article.findAll({order:[['createdAt','desc']],limit:5})
    ctx.body={code:0,msg:'请求成功',data:latestArticles}
})

module.exports=router