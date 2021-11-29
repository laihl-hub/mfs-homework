let newArr=[1,2,3].map(x=>x*x)//转换成箭头函数写法
console.log(newArr);

//用普通函数进行柯里化
function cala_curry(add){
  return function(mul){
    return function(origin){
      return (origin+add)*mul
    }
  }
}
let num1=cala_curry(1)(2)(3)
console.log(num1);

//用箭头函数进行柯里化
var cala_curry2=add=>mul=>origin=>(origin+add)*mul
let num2=cala_curry2(1)(2)(3)
console.log(num2);

//用Set进行数组去重
var arr=[1,2,1,4,4,5,6,7,3,2]
console.log(...new Set(arr));

//打印Map中所有的键值对
let map=new Map([['name','lili'],['age',18],['phone',123456],[0,'id']])
for (const key of map.keys()) {
  console.log(key+':'+map.get(key));
}
map.forEach((value,key)=>{console.log(key+':'+value);})