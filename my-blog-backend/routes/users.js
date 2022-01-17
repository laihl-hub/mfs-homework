const router = require('koa-router')()
const {User}=require('../model')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/login',async (ctx)=>{
  let uid=ctx.session.userId
  console.log(uid);
  if(uid){
    // console.log(uid);
    let user=await User.findOne({where:{id:uid}})
    // console.log(user);
    // await ctx.render('login_seccess',{username:user.username})
    await ctx.render('index',{title:user.username})
    // await ctx.redirect('/')
  }else{
    await ctx.render('login')
  }
})

router.get('/regist',async(ctx)=>{
  await ctx.render('regist')
})

router.post('/login',async(ctx)=>{
  console.log(ctx.request.body);
  let {username,password}=ctx.request.body
  let user=await User.findOne({where:{username}})
  console.log(user);
  if(!user||user.password!=password){
    // await ctx.render('login_failed',{resson:'用户名或密码不正确'})
    await ctx.render('index',{title:'登陆失败'})
    console.log('登陆失败');
    return
  }
  ctx.session.userId=user.id
  // await ctx.render('login_success')
  await ctx.render('index',{title:username})
  console.log('登录成功');
})

router.get('/loginout',async(ctx)=>{
  ctx.session=null
  // await ctx.render('loginout_seccess')
  await ctx.render('index',{title:'登出成功'})
})

router.post('/regist',async(ctx)=>{
  console.log(ctx.request.body);
  await User.create(ctx.request.body)
  // await ctx.render('regist_success')
  await ctx.render('login')
})
module.exports = router
