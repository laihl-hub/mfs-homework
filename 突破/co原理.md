## co 原理

Generator 是一个异步操作的容器，但是不能自动执行，碰到 yield 命令就会暂停，只能通过调用 next()方法继续执行后面的代码。所以它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。

1. 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。

2. Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的 yield 命令后面，只能是 Thunk 函数或 Promise 对象（如果是数组或对象的话，会被转换成 promise 对象）。并且 co 模块现在返回一个 promise 对象。

co 模块将 gen.next()方法的调用封装在了 onFulfilled()和 onRejected()函数中，这样可以捕捉抛出的错误。然后又在这两个方法中调用了 next()方法（co 移交执行权的方法），然后 next()方法中又根据上一个 yield 的结果来 onfulfilled 或 onrejected，从而实现自调用，这样就可以自动执行。
co 还根据 yiled 命令后的表达式的值的类型提供了对应的将其转为 promise 对象的方法，从而利用.then 方法进行处理，实现自动流程管理等操作。
