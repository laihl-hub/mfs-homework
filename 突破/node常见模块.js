const fs=require('fs')
// const path = require("path");
const http=require('http')
const multiparty=require('multiparty')



fs.readFile('./test.txt',(err,data)=>{
    if(err){
        console.log('读取文件失败');
    }else{
        console.log(data.toString());
    }
})

fs.writeFile('./test.txt','我是写入进来的',(err)=>{
    if(err){
        console.log('写入失败');
    }else{
        console.log('写入成功');
    }
})


//请自行查阅资料学习fs.ReadStream，并使用它读取任意文件并将其中内容打印

var readerStream = fs.createReadStream('index.js');
let data=''
readerStream.on('data', function(chunk) {
    console.log('数据来啦');
   data += chunk;
});
readerStream.on('close',function(){
    console.log('读取完毕');
   console.log(data);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");


//请使用 http server 配合流处理，完成form表单的文件上传功能（浏览器提交的文件需要保存到服务器端自己定义的目录下）
const hostname='127.0.0.1'
const port=8080
const server = http.createServer((req, res) => {
   // res.setHeader('Content-type','text/plain;charset=utf-8')
   if(req.url==='/upload'&&req.method.toLowerCase()==='post'){
      if(req.headers['content-type'].indexOf('multipart/form-data')!==-1){
         // console.log(req.headers['content-type']);
         var form=new multiparty.Form()
         // console.log(form);
         form.encodeing='utf-8'
         form.uploadDir='./upload/'
         form.maxFileSize=2*1024*1024
         form.parse(req,(err,fields,files)=>{
            // console.log(files);
            console.log(files.files);
            for(var i in files.files){
               let file=files.files[i]
               let filename=file.originalFilename
               let newPath=form.uploadDir+filename
               fs.renameSync(file.path,newPath)
            }
            // console.log(files.path);
         })
      }
      res.end('done')
   }
   
});
server.listen(port, hostname); 


//Node.js 中 http 模块既有 server 端，又有 client 端，请实现一个简单的server：对于任何请求返回hello。而后使用 client 端请求你自己的server，并打印出结果
const server2=http.createServer((req,res)=>{
   res.end('hello')
})
server2.listen(3000,hostname)
http.get('http://127.0.0.1:3000',(res)=>{
   res.on('data',(data)=>{
      console.log(data.toString());
   })
})




