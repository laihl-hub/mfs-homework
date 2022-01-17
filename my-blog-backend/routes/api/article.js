const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
// const { DATE } = require('sequelize');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const {Op, where} =require('sequelize')
const router=require('koa-router')()
const {Article, Tag, User, Tagging}=require('../../model')




router.prefix('/article')

router.get('/',async(ctx)=>{
    let now=new Date()
    console.log(now.toString());
    let {sort=[],offset=0,pageSize=10,filter=['1975-01-01',now],userId=''}=ctx.request.query
    if(typeof sort=='string'){
        console.log(111111)
        sort=JSON.parse(sort)
    }
    // console.log(typeof filter);
    if(typeof filter=='string'){
        if(filter==="{}"){
            console.log(1111);
            filter=['1975-01-01',now]
        }else{
            filter=JSON.parse(filter)
            console.log(typeof filter);
        }
        
        console.log(filter);
        
    }
    if(userId!=''){
        userId=parseInt(userId)
    }
    offset=parseInt(offset)
    pageSize=parseInt(pageSize)
//     ctx.set({"Access-Control-Allow-Origin":"*",
//     "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,PATCH"
// })
console.log(filter);
let articles
if(userId!=''){
    articles=await Article.findAll({
        order:sort.length===0?null:[sort],
        offset:offset,
        limit:pageSize,
        // where:filter
        where:{'createdAt':{
            [Op.between]:filter
        },'userId':userId},
        include:[{model:Tag},{model:User,attributes:['username']}]
    })
}else{
    articles=await Article.findAll({
        order:sort.length===0?null:[sort],
        offset:offset,
        limit:pageSize,
        // where:filter
        where:{'createdAt':{
            [Op.between]:filter
        }},
        include:[{model:Tag},{model:User,attributes:['username']}]
    })
}
let total
    if(userId!=''){
        total=await Article.count({where:{'userId':userId}})
    }else{
        total=await Article.count()
    }
    
    let count=articles.length
    let nextOffset=offset+pageSize>=total?null:offset+pageSize
    ctx.body={code:0,msg:'',pagination:{total,count,offset,nextOffset,pageSize},data:articles.map(i=>{
        i.intro=DOMPurify.sanitize(i.intro)
        // i.del=DOMPurify.sanitize(i.del)
        return i
    })}
})

router.get('/:id',async(ctx)=>{
    // ctx.set({"Access-Control-Allow-Origin":"*",
    // "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,PATCH"})
    console.log(ctx.params.id);
    let article=await Article.findOne({where:{id:ctx.params.id},include:[{model:Tag}]})
    let res=''
    
    if(article){
        // let tags=await article.getTags()
        article.viewTimes++
        await article.save()
        article.del=DOMPurify.sanitize(article.del)
        res={code:0,msg:'',data:article}
    }else{
        res={code:1,msg:'没有该文章'}
    }
    ctx.body=res
})
router.post('/',async(ctx)=>{
    let res=''
    let userId=ctx.session.userId
    let {title,tag,intro,del}=ctx.request.body
    console.log(tag);
        let article=await Article.create({title,intro,del,userId})
        for (const id of tag) {
            console.log(article.id);
            await Tagging.create({articleId:article.id,tagId:id})
        }
        // tag=JSON.parse(tag)
        res={code:0,msg:'发表成功',data:article}
    
    
    ctx.body=res
})

router.put('/:id',async(ctx)=>{
    let res=''
    let article=await Article.findOne({where:{id:ctx.params.id}})
    if(!article){
        res={code:1,mag:'失败'}
    }else{
        let {title,tag,intro,del}=ctx.request.body
        article.title=title
        article.intro=intro
        article.del=del
        article=await article.save()
        let newArr=[]
        for (const i of tag) {
            newArr.push({articleId:ctx.params.id,tagId:i})
        }
    
       await Tagging.bulkCreate(newArr,{updateOnDuplicate:['articleId','tagId']})
            // await Tagging.findCreateFind({defaults:{articleId:ctx.params.id,tagId:tag},where:{articleId:ctx.params.id,tagId:tag}})
            await Tagging.destroy({where:{articleId:ctx.params.id,[Op.not]:[{tagId:tag}]}})
        
        article=await Article.findOne({where:{id:ctx.params.id},include:[{model:Tag}]})
        res={code:0,msg:'修改成功',data:article}
    }
    ctx.body=res
})

router.delete('/:id',async(ctx)=>{
    let article=await Article.findOne({where:{id:ctx.params.id}})
    if(!article){
        res={code:1,msg:'失败'}
    }else{
        await article.destroy()
        res={code:0,msg:'删除成功'}
    }
    ctx.body=res
})


module.exports=router