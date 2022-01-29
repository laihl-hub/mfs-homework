const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
// const { where } = require('sequelize/dist');
// const { where } = require('sequelize/dist');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const router=require('koa-router')()
// const Article=require('../../model/article')
const {sequelize,Article,Tag, Tagging}=require('../../model')
// const { QueryTypes } = require('sequelize')
router.prefix('/tags')



router.get('/',async(ctx)=>{
    let {sort=[],offset=0,pageSize='max'}=ctx.request.query
    if(typeof sort=='string'){
        console.log(111111)
        sort=JSON.parse(sort)
    }
    offset=parseInt(offset)
    if(pageSize!='max'){
        
    }else{
        pageSize=await Tag.count()
    }
    pageSize=parseInt(pageSize)
    // pageSize=parseInt(pageSize)
    let tags=await Tag.findAll({
        order:sort.length===0?null:[sort],
        offset:offset,
        limit:pageSize})
        let total=await Tag.count()
        let count=tags.length
        let nextOffset=offset+pageSize>=total?null:offset+pageSize
    ctx.body={code:0,msg:'成功',pagination:{total,count,offset,nextOffset,pageSize},data:tags}
})
router.post('/',async(ctx)=>{
    let {name,description}=ctx.request.body
    console.log(name);
    let tag
    try {
        tag=await Tag.create({name,description})
    } catch (error) {
        ctx.body={code:1,msg:'失败'}
        return 
    }
    ctx.body={code:0,msg:'成功',data:tag}
})

router.get('/:id/article',async(ctx)=>{
    let {id}=ctx.params
    let {offset=0,pageSize=10}=ctx.request.query
    offset=parseInt(offset)
    pageSize=parseInt(pageSize)
    // let {offset=0,pageSize=10}=ctx.request.query
    let tag=await Tag.findOne({where:{id:id}})
    let articles=await tag.getArticles(
        {offset:offset,
            limit:pageSize,
            include:[{model:Tag}]
        }
    )
    // let total=(await tag.getArticles()).length
    let total=await Tagging.count({where:{'tagId':id}})
    // console.log(total);
    let count=articles.length
    let nextOffset=offset+pageSize>=total?null:offset+pageSize
    let res
    if(articles){
        res={code:0,msg:'成功',pagination:{total,count,offset,nextOffset,pageSize},data:articles.map(i=>{
            i.intro=DOMPurify.sanitize(i.intro)
            // i.del=DOMPurify.sanitize(i.del)
            return i
        })}
    }else{
        res={code:1,msg:'没有文章'}
    }
    ctx.body=res
    
})

router.put('/:id',async(ctx)=>{
    let res=''
    let tag=await Tag.findOne({where:{id:ctx.params.id}})
    if(!tag){
        res={code:1,msg:'失败'}
    }else{
        let {name,description}=ctx.request.body
        tag.name=name
        tag.description=description
        tag=await tag.save()
        res={code:0.,msg:'成功',data:tag}
    }
    ctx.body=res
})

router.delete('/',async(ctx)=>{
    let tag
    let {ids}=ctx.request.query
    console.log(ids)
    ids=JSON.parse(ids)
    try {
        // tag=await Tag.destroy({where:{id:ctx.params.id}})
        tag=await Tag.destroy({where:{id:ids}})
    } catch (error) {
        ctx.body={code:1,msg:'失败',data:''}
        return
    }
    ctx.body={code:0,msg:'成功',data:ids}
    

})

module.exports=router