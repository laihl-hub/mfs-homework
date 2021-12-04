const fs=require('fs')
const XMLHttpRequest=require('xmlhttprequest').XMLHttpRequest
const co=require('co')

//ajax请求方法
function ajaxGet(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return
            }
            if (this.status === 200) {
                // console.log(this.responseText);
                resolve(this.responseText)
            } else {
                reject(this.statusText)
            }
        }
        xhr.responseType = 'json'
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.send()
    })
}



//Thunkfy模块
function thunkfy(fn) {
    return function () {//先是将所有需要的参数传入
        var args = [...arguments]
        var _this = this
        return function (callback) {//返回一个只参数为 回调函数 的函数，此函数为 Thunk函数
            var called
            args.push(function () {
                if (called) return;
                called = true
                callback.apply(null, arguments)
            })
            try {
                fn.apply(_this, args)
            } catch (err) {
                callback(err)
            }
        }
    }
}
function callback(err,data){
    if(err)throw err;
    console.log(data);
}
var readFileThunk=thunkfy(fs.readFile)
// readFileThunk('data.js','utf8')(callback)


//yield命令后面是Thunk函数
function* get1(){
    var r1=yield readFileThunk('data.js','utf8')
    console.log(r1);
    var r2=yield readFileThunk('data.js','utf8')
    console.log(r2);
}
//基于Thunk函数的generator函数自动运行器
function run1(fn) {
    var gen=fn()
    function next(err,data){
        var result=gen.next(data)
        if(result.done)return 
        result.value(next)
    }
    next()
}
// run1(get1)


//yield后面是promise对象
function* get2() {
    var r1 = yield ajaxGet('http://learning-api.mafengshe.com/news?pageSize=10&page=1')
    console.log(r1);
    var r2 = yield ajaxGet('http://learning-api.mafengshe.com/news?pageSize=10&page=2')
    console.log(r2);
    yield Promise.reject('出错了')
}
//基于promise的generator函数的自动执行器
function run2(fn) {
    var gen = fn()
    function next(data) {
        var result = gen.next(data)
        if (result.done) return result.value
        result.value.then(data => { next(data) }, reason => { console.log(reason); })
    }
    next()
}
// run2(get2)



//使用generator函数串行发送10个请求
function* serialGetTen() {
    var page = 1
    for (; page < 10; page++) {
        var result = yield ajaxGet('http://learning-api.mafengshe.com/news?pageSize=5&page=' + page)
        console.log(result);
    }
}
// co(serialGetTen)

//使用generator函数并行发送10个请求
function* parallelGetTen(page) {
    var result = yield ajaxGet('http://learning-api.mafengshe.com/news?pageSize=5&page=' + page)
    return result 
}
// co(function* (){
//     var pages=[1,2,3,4,5,6,7,8,9,10]
//     var result=yield pages.map(parallelGetTen)
//     console.log(result);
// })




//使用async/await实现串行发送10个请求
async function serialGetTen2() {
    var page = 1
    for (; page < 10; page++) {
        var result = await ajaxGet('http://learning-api.mafengshe.com/news?pageSize=10&page=' + page)
        console.log(result);
    }
    return '加载成功'
}
// serialGetTen2().then(data => { console.log(data); })
//     .catch(reason => { console.log(reason); })

//使用async/await实现并行发送10个请求
async function parallelGetTen2() {
    var promises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => { ajaxGet('http://learning-api.mafengshe.com/news?pageSize=10&page=' + page) })
    var result = await Promise.all(promises)
    return result
}
// parallelGetTen2().then(data => { console.log(data); })
//     .catch (reason => { console.log(reason); })


