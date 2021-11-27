var express = require('express');
var router = express.Router();
var data=require('../public/javascripts/data')
var d=data()
var regionInfo


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getRegions',function(req,res,next){
  var region=[]
  for(let i=0;i<d.length;i++){
    region.push({name:d[i].region.name,code:d[i].region.code})
  }
  res.send({data:region})
})

router.get('/getCity',function(req,res,next){
  var index=req.query.regionIndex
  regionInfo=d[index].region.state
  var cities=[]
  for(let i=0;i<regionInfo.length;i++){
    cities.push({name:regionInfo[i].name,code:regionInfo[i].code})
  }
  res.send({data:cities})
})
router.get('/getCounty',function(req,res,next){
  var index=req.query.cityIndex
  var cityInfo=regionInfo[index].city
  var counties=[]
  for(let i=0;i<cityInfo.length;i++){
    counties.push({name:cityInfo[i].name,code:cityInfo[i].code})
  }
  res.send({data:counties})
})
module.exports = router;
