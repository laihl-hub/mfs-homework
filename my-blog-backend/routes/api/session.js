const router = require('koa-router')()
const {User}=require('../../model')

router.prefix('/session')


router.get('/',async(ctx)=>{
    console.log(ctx.session.userId);
    if(ctx.session.userId){
        let user =await User.findOne({where:{id:ctx.session.userId}})
    ctx.body={code:0,msg:'',data:user}
    }else{
        ctx.body={code:1,msg:'没有登陆',data:''}
    }
    
})

router.post('/login',async(ctx)=>{
    let{username,password}=ctx.request.body
    let user=await User.findOne({where:{username}})
    let res
    if(!user||user.password!=password){
        res={code:1,msg:'登陆失败',data:''}
    }else{
        ctx.session.userId=user.id
        res={code:0,msg:'登录成功',data:{id:user.id,username:user.username,email:user.email}}
    }
    ctx.body=res
})

router.delete('/',async(ctx)=>{
    ctx.session=null
    ctx.body={code:0,msg:'成功',data:''}
})
module.exports=router