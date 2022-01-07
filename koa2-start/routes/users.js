var router = require('koa-router')();

router.prefix('/users');
var getDtata=require('../static/data')
const data=getDtata()

var userData=[
  {id:1,name:'laihla',password:'laihla1220'},
  {id:2,name:'lili',password:'123456'},
  {id:3,name:'sisi',password:'123'},
  {id:4,name:'zizi',password:'456'},
  {id:5,name:'didi',password:'789'}
]

router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

router.get('/region', function *(next) {
  // this.body = 'this is a users/bar response!';
  let regions=[]
  data.forEach(i=>{
    regions.push(i.region.name)
  })
  this.body=regions
});


// router.get('/regions', async(ctx,next)=>{
//   let regions=[]
//   data.forEach(i=>{
//     regions.push(i.region.name)
//   })
//   ctx.body=regions
// });

router.get('/cities/:region',function *(next){
  // console.log(ctx.request.headers);
  let region=this.params.region
  console.log(region);
  let cities=[]
  data.forEach(i=>{
    if(i.region.name===region){
      i.region.state.forEach(sub=>{
        cities.push(sub.name)
      })
    }
  })
  this.body=cities
})

router.get('/countries/:region/:city',function *(next){
  let region=this.params.region
  let city=this.params.city
  let counties=[]
  data.forEach(i=>{
    if(i.region.name===region){
      i.region.state.forEach(sub=>{
        if(sub.name===city){
          sub.city.forEach(subSub=>{
            counties.push(subSub.name)
          })
        }
      })
    }
  })
  this.body=counties
})

router.post('/validName',function*(next){
  let userName=this.request.body.username
  // let password=this.request.body.password
  let repeat=userData.find(i=>i.name===userName)
  // let resBody={}
  if(repeat){
    resBody={code:1,exist:true,msg:'用户名已存在'}
  }else{
    resBody={code:0,exist:false,msg:'用户名不存在'}
    // if(password){
      // let user={id:userData.length+1,name:userName,password:password}
      // userData.push(user)
      // resBody={code:0,exist:false,msg:'注册成功'}
    // }
  }
  console.log(userData);
  this.body=resBody
})


router.post('/regist',function*(next){
  let userName=this.request.body.username
  let password=this.request.body.password
  let user={id:userData.length+1,name:userName,password:password}
  userData.push(user)
  resBody={code:0,msg:'注册成功'}
  console.log(userData);
  this.body=resBody
})
module.exports = router;
