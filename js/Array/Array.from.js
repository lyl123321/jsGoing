class subArray extends Array {
	//默认的 constructor 方法
	constructor(...args) {
	    super(...args);
	}
}
//由 3 个空位(empty) 而不是 undefined 组成的数组
console.log(new subArray(3));
//返回一个 subArray 实例
console.log(subArray.from(new Set([2,4,3])));

//Array.from 的首个参数可以是伪数组对象(有 length 属性以及对应的索引属性，如 obj[5])或可迭代对象，后两个参数同和 map 方法的参数一样
let a = Array.from({length: 5}, (v, i) => i);
//同下
let a = Array.from({length: 5}).map((v, i) => i);
console.log(a);

//数组去重合并
function combine(){ 
    let arr = [].concat.apply([], arguments);  //未去重的合并数组 
    return Array.from(new Set(arr));
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));    