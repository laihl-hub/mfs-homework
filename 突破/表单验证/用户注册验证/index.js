var express = require('express');
var router = express.Router();
var getUsername=require('../public/javascripts/data')
var usernames=getUsername()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/regist',function(req,res,next){
  if(usernames.indexOf(req.body.username)!=-1){
    res.json({exsit:true})
  }else{
    res.json({exsit:false})
  }
  
})
module.exports = router;
