var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get_data',function(req,res,next){
  let fn=req.query.callback
  let str=`${fn}({name:"I'm lahl"})`
  res.send(str)
})

router.get('/json',function(req,res,next){
  res.header({'Access-Control-Allow-Origin':'http://a.test.com:3000'})
  res.json({data:'hello world'})
})

router.post('/regist',function(req,res,next){
  res.header({'Access-Control-Allow-Origin':'http://a.test.com:3000'})
  if(req.body.usname==='mafengshe'){
    res.send({errno:1,errmsg:'用户名已存在',data:{}})
  }else{
    res.send({errno:0,errmsg:"",data:{}})
  }
})
module.exports = router;
