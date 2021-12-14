import test from './test.txt';
require('./styless.css')
require('./styless.styl')
const axios=require('axios')
console.log(test);
console.log(111);
console.log(222);
console.log(333);
axios.get(' http://learning-api.mafengshe.com/news?pageSize=5&page=1').then(data=>{console.log(data);})