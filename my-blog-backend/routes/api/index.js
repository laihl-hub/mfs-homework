const fs=require('fs')
const router=require('koa-router')()
const {User,Permission}=require('../../model')
// const articleRouter=require('./article')
// const latestArticleRouter=require('./latestArticle')
router.prefix('/api')

// router.get('/article',async(ctx)=>{
//     ctx.body={key:'scsacasc'}
// })


router.use(async(ctx,next)=>{
    ctx.set({"Access-Control-Allow-Origin":"http://localhost:8080",
    "Access-Control-Allow-Credentials":"true" ,
    "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,PATCH,OPTIONS"})
    if(ctx.method.toLocaleUpperCase()==='OPTIONS'){
        ctx.body=''
      }else{
        await next()
      }
})

router.use(async(ctx,next)=>{
  console.log(ctx.request);
  const {method,url}=ctx.request
  const userId=ctx.session.userId||1
  let user=await User.findOne({where:{'id':userId}})
  let permissions=await user.getPermissions()
  console.log(permissions);
  if(method!='GET'){
    console.log(userId);
    if(permissions.some(i=>i.method==method&&new RegExp(i.path).test(url))){
      await next()
    }else{
      ctx.body={code:1,msg:'没有权限',data:''}
    }
  }else{
    if(url==='/api/users'){
      // console.log('走到了这里');
      let res=permissions.some(i=>i.method==method&& new RegExp( i.path).test(url))
      console.log(res);
      if(res){
        // console.log(res);
        // await next()
      }else{
        ctx.body={code:1,msg:'没有权限',data:''}
        return
      }
    }
    await next()
  }
  
})

fs.readdirSync(__dirname).filter(i=>i!='index.js').forEach(item=>{
  let m=require(`./${item}`)
  router.use(m.routes())
})
// router.use(articleRouter.routes(),articleRouter.allowedMethods())
// router.use(latestArticleRouter.routes(),latestArticleRouter.allowedMethods())

module.exports=router