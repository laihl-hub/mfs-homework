const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const apiRouters=require('./routes/api')
const session = require('koa-session')

// error handler
onerror(app)

app.keys=['blog']

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


app.use(session({
  key:'blog:koa:sess',
  maxAge:86400000
},app))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async(ctx,next)=>{
  ctx.set({"Access-Control-Allow-Origin":"http://localhost:8080",
  "Access-Control-Allow-Credentials":"true" ,
    "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type"
  })
  if(ctx.method.toLocaleUpperCase()==='OPTIONS'){
    
    // console.log(1111);
    ctx.body=''
  }else{
    await next()
  }
})
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(apiRouters.routes(),apiRouters.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
