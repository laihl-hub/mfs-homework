//交换
let a=0,b=1;
console.log(a,b);
[a,b]=[b,a]
console.log(a,b);

//斐波那契前10
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
  
  let [first, second, third, fourth, fifth, sixth,seventh,eighth,ninth,tenth] = fibs();
  console.log(first, second, third, fourth, fifth, sixth,seventh,eighth,ninth,tenth);

  //b=10的默认参数值
  function test({a,b=10}={}){
      console.log(a,b);
  }
  test({a:3,b:3})//3,3
  test({a:3})//3,10
  test({b:3})//undefined,3
  test({})//undefined,10
  test()//unndefined,10