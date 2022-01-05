var express = require('express');
var router = express.Router();


var users=[{
  id:1,
  name:'lili',
  password:123456,
  email:'113@qq.com'
},
{
  id:2,
  name:'sisi',
  password:456789,
  email:'228@qq.com'
}]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user/:id',(req,res,next)=>{
  let user=users.find(u=>u.id===parseInt(req.params.id))
  if(!user) return res.status(404).json({msg:'Not Found'})
  console.log(user)
  res.send(user)
  res.end()
})

router.post('/login',(req,res,next)=>{
  let user=req.body
  console.log(req.body)
  let user2=users.find(u=>u.name===user.name&&u.password===user.password)
  if(!user2) return res.status(404).json({msg:'Not Found'})
  res.send({name:user2.name,msg:'登录成功'})
  res.end()
})

//需要提供全部信息
router.put('/update',(req,res,next)=>{
  let user=req.body
  let user2=users.find(u=>u.id===user.id)
  if(!user2) return res.status(404).json({msg:'Not Found'})
  user2.name='lili2'
  users[user.id-1]=user2
  console.log(users)
  res.send({user:user2,mas:'修改成功'})
  res.end()
})

router.delete('/delete',(req,res,next)=>{
  let user=req.body
  let user2=users.find(u=>u.id===user.id)
  if(!user2) return res.status(404).json({msg:'Not Found'})
  users.splice(user2.id-1,1)
  console.log(users)
  res.send({msg:'删除成功'})
  res.end()
})

//只需要提供部分信息
router.patch('/update2',(req,res,next)=>{
  let user=req.body
  let user2=users.find(u=>u.id===user.id)
  if(!user2) return res.status(404).json({msg:'Not Found'})
  user2.name='new Name'
  users[user.id-1]=user2
  console.log(users)
  res.send({user:user2,mas:'修改成功'})
  res.end()
})

module.exports = router;
