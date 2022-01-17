const router=require('koa-router')()
const {Op}=require('sequelize')
const {User,Permission, Tagging, Tag, UserPermission}=require('../../model')
router.prefix('/users')

router.get('/',async(ctx)=>{
    let {sort=[],offset=0,pageSize=10}=ctx.request.query
    if(typeof sort=='string'){
        console.log(111111)
        sort=JSON.parse(sort)
    }
    offset=parseInt(offset)
    pageSize=parseInt(pageSize)
    // console.log(ctx.session.userId);
    let users=await User.findAll({order:sort.length===0?null:[sort],
        offset:offset,
        limit:pageSize})
        let total=await User.count()
        let count=users.length
        let nextOffset=offset+pageSize>=total?null:offset+pageSize
    ctx.body={code:0,msg:'成功',pagination:{total,count,offset,nextOffset,pageSize},data:users}
})

router.post('/regist',async(ctx)=>{
    console.log(ctx.request.body);
    let {username,password,email}=ctx.request.body
    let user
    try {
        user=await User.create({username,password,email})
    } catch (error) {
        ctx.body={code:1,msg:'用户名已存在',data:''}
        return
    }
    let permissions=await Permission.findAll({where:{'name':{[Op.not]:['用户注册','修改标签','删除标签']}}})
    let newArr=[]
    permissions.forEach(i=>{
        newArr.push({'userId':user.id,'permissionId':i.id})
    })
    await UserPermission.bulkCreate(newArr)
    ctx.body={code:0,msg:'注册成功',data:''}
  })



  module.exports=router