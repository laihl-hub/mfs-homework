//range(start,end)函数
function* range(start,end){
    for(let i=start;i<=end;i++){
        yield i;
    }
    return 'done'
}
for (const item of range(1,10)) {
    console.log(item);
}

//fib()函数
function* fib(){
    let [pre,cur]=[0,1]
    while(true){
        yield cur;
        [pre,cur]=[cur,pre+cur];
    }
}
//使用解构计算前3项

let [first,second,third]=fib()
console.log(first,second,third);