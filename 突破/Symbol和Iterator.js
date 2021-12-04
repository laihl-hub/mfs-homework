//1.请实现与下面 generator 函数 等价的迭代器
// function* gen(){
//     yield 1
//     yield 2
//     return 3;
//  }
let obj1={
    [Symbol.iterator]:function(){
        var index=1
        return{
            next(){
                if(index<=2){
                    return {value:index++,done:false}
                }else{
                    return {value:undefined,done:true}
                }
            }
        }
    }
}
// for (const item of obj1) {
//     console.log(item);
// }



//2.请给对象 let obj={} 加上迭代器，实现可以无限打印 a
let obj2={
    [Symbol.iterator]:function(){
        return {
            next(){
                return {
                    value:'a',
                    done:false
                }
            }
        }
    }
}
// for (const item of obj2) {
//     console.log(item);
// }



//3.请给对象 obj 加上迭代器，使其可以像数组一样使用 for of 循环
// let obj = {
//     [0] : "a",
//     [1] : "b",
//     [2] : "c",
//     length : 3
//  }
let obj3={
    [0]:"a",
    [1]:"b",
    [2]:"c",
    length:3,
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
// for (const item of obj3) {
//     console.log(item);
// }


